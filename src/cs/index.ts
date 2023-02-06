/**
 * Sets up a central system, that can communicate with charge points
 */
import WebSocket from 'ws';
import { IncomingMessage, createServer, Server } from 'http';
import { ActionName, Request, RequestHandler, Response } from '../messages';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { Connection, OCPPJMessage, SUPPORTED_PROTOCOLS } from '../ws';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import { OCPPRequestError, ValidationError } from '../errors';
import { EitherAsync, Left } from 'purify-ts';
import * as fs from 'fs';
import * as path from 'path';
import * as soap from 'soap';
import * as uuid from 'uuid';
import { IServices, ISoapServiceMethod } from 'soap';
import { OCPPVersion } from '../types';
import SOAPConnection from '../soap/connection';
import Debug from "debug";
const debug = Debug("ts-ocpp:cs");

const handleProtocols = (protocols: string[]): string =>
  protocols.find((protocol) => SUPPORTED_PROTOCOLS.includes(protocol)) ?? '';

type ConnectionListener = (
  cpId: string,
  status: 'disconnected' | 'connected'
) => void;

export type RequestMetadata = {
  chargePointId: string
  httpRequest: IncomingMessage;
  validationError?: ValidationError;
};

export type WebsocketRequestResponseListener =
  (initiator: 'chargepoint' | 'central-system', type: 'request' | 'response', data: OCPPJMessage, metadata: Omit<RequestMetadata, 'validationError'>) => void;

export type CSSendRequestArgs<T extends CentralSystemAction<V>, V extends OCPPVersion> = {
  ocppVersion: 'v1.6-json',
  chargePointId: string,
  payload: Omit<Request<T, V>, 'action' | 'ocppVersion'>,
  action: T,
} | {
  ocppVersion: 'v1.5-soap',
  chargePointUrl: string,
  chargePointId: string,
  payload: Omit<Request<T, V>, 'action' | 'ocppVersion'>,
  action: T,
};

export type CentralSystemOptions = {
  /** if the chargepoint sends an invalid request(in ocpp v1.6), we can still forward it to the handler */
  rejectInvalidRequests?: boolean,
  /** default is 0.0.0.0 */
  host?: string,
  /**
   * can be used to log exactly what the chargepoint sends to this central system without any processing
   * @example
   * onRawSocketData: (data) => console.log(data.toString('ascii'))
   **/
  onRawSocketData?: (data: Buffer) => void
  onRawSoapData?: (type: 'replied' | 'received', data: string) => void
  onRawWebsocketData?: (data: WebSocket.Data, metadata: Omit<RequestMetadata, 'validationError'>) => void,

  onWebsocketRequestResponse?: WebsocketRequestResponseListener,
  onWebsocketError?: (error: Error, metadata: Omit<RequestMetadata, 'validationError'>) => void,
  /** in milliseconds */
  websocketPingInterval?: number,
  websocketRequestTimeout?: number,

  /** can be used to authorize websockets before the socket formation */
  websocketAuthorizer?: (metadata: RequestMetadata) => Promise<boolean> | boolean,
  chargePointIdExtractor?: (httpRequest: IncomingMessage) => string | undefined,
}

type RequiredPick<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Represents the central system, can communicate with charge points
 *
 * @example
 * import { CentralSystem } from '@voltbras/ts-ocpp';
 *
 * // port and request handler as arguments
 * const centralSystem = new CentralSystem(3000, (req, { chargePointId }) => {
 *   switch (req.action) {
 *     case 'Heartbeat':
 *       // returns a successful response
 *       // (we pass the action and ocpp version so typescript knows which fields are needed)
 *       return {
 *         action: req.action,
 *         ocppVersion: req.ocppVersion,
 *         currentTime: new Date().toISOString()
 *       };
 *   }
 *   throw new Error('message not supported');
 * });
 * 
 * @category Central System
 */
export default class CentralSystem {
  private cpHandler: RequestHandler<ChargePointAction, RequestMetadata>;
  /** each chargepoint has a list of connections because there is an
   * issue with some chargers that do not fully close the previous websocket connection
   * after creating a new websocket connection, with this we can still keep track of all
   * current opened sockets, and only remove the connections whose sockets have closed.
   *
   * (for more info: see the test "if two sockets open before the first one closing, should still remain the latest socket") */
  private connections: Record<string, Array<Connection<ChargePointAction>>> = {};
  private listeners: ConnectionListener[] = [];
  private websocketsServer: WebSocket.Server;
  private soapServer: soap.Server;
  private httpServer: Server;
  private options: RequiredPick<CentralSystemOptions, 'websocketPingInterval' | 'rejectInvalidRequests' | 'websocketAuthorizer' | 'chargePointIdExtractor'>;

  constructor(
    port: number,
    cpHandler: RequestHandler<ChargePointAction, RequestMetadata>,
    options: CentralSystemOptions = {},
  ) {
    this.cpHandler = cpHandler;
    const host = options.host ?? '0.0.0.0';
    this.options = {
      ...options,
      rejectInvalidRequests: options.rejectInvalidRequests ?? true,
      websocketPingInterval: 30_000,
      websocketAuthorizer: options.websocketAuthorizer ?? (() => true),
      chargePointIdExtractor: options.chargePointIdExtractor ?? ((httpRequest) => httpRequest.url?.split('/').pop()),
    };
    debug('creating central system on port %d - options: %o', port, this.options);

    this.httpServer = createServer();
    const httpDebug = debug.extend('http');
    this.httpServer.on('connection', socket => {
      httpDebug('new http connection');
      socket.on('data', data => {
        httpDebug('http connection received data:\n%s', data.toString('ascii'));
        if (options.onRawSocketData)
          options.onRawSocketData?.(data);
      });
    })
    this.httpServer.listen(port, host);

    this.soapServer = this.setupSoapServer();
    this.websocketsServer = this.setupWebsocketsServer();
  }

  public addConnectionListener(listener: ConnectionListener) {
    this.listeners.push(listener);
  }

  public close(): Promise<void> {
    const httpClosing = new Promise(resolve => this.httpServer.close(resolve));
    const wsClosing = new Promise(resolve => this.websocketsServer.close(resolve));
    return Promise.all([httpClosing, wsClosing]).then(() => { });
  }

  sendRequest<V extends OCPPVersion, T extends CentralSystemAction>(args: CSSendRequestArgs<T, V>): EitherAsync<OCPPRequestError, Response<T, V>> {
    return EitherAsync.fromPromise(async () => {
      const { chargePointId, payload, action } = args;
      const cpDebug = debug.extend(chargePointId);
      if (!chargePointId) return Left(new OCPPRequestError('charge point id was not provided'));
      // @ts-ignore - TS somehow doesn't understand that this is right
      const request: Request<T, V> = { ...payload, action, ocppVersion: args.ocppVersion };

      cpDebug('sending request: %o', request);
      switch (args.ocppVersion) {
        case 'v1.6-json': {
          // get the first available connection of this chargepoint
          cpDebug('getting connection from list of %d connections', this.connections[chargePointId]?.length);
          const [connection] = this.connections[args.chargePointId] ?? [];
          if (!connection) {
            cpDebug('no connection found, rejecting request');
            return Left(new OCPPRequestError('there is no connection to this charge point'));
          }

          return connection
            .sendRequest(
              action,
              request as Request<T, 'v1.6-json'>
            ) as EitherAsync<OCPPRequestError, Response<T, V>>;
        }
        case 'v1.5-soap': {
          const connection = await SOAPConnection.connect(args.chargePointUrl, 'cp', args.chargePointId);
          return connection.
            sendRequest(
              action,
              request as Request<T, 'v1.5-soap'>
            ) as EitherAsync<OCPPRequestError, Response<T, V>>;
        }
      }
    })
  }

  /** @internal */
  private setupSoapServer() {
    const services: IServices = {
      CentralSystemService: {
        CentralSystemServiceSoap12: Object.fromEntries(
          chargePointActions.map(
            action => [action, this.getSoapHandler(action)]
          )
        )
      }
    };
    const xml = fs.readFileSync(path.resolve(__dirname, '../messages/soap/ocpp_centralsystemservice_1.5_final.wsdl'), 'utf8');
    const server = soap.listen(this.httpServer, {
      services,
      path: '/',
      xml,
      forceSoap12Headers: true,
    });

    server.log = (type, data) => {
      if (type === 'received' || type === 'replied') {
        this.options.onRawSoapData?.(type, data)
      }
    };

    // makes headers case insensitive(lowercase)
    const normalizeHeaders = (headers: Record<string, string>) =>
      Object.entries(headers).reduce<Record<string, string>>((acc, [key, val]) => (acc[key.toLowerCase()] = val, acc), {});

    server.addSoapHeader((action: any, args: any, headers: any) => ({
      'Action': '/' + action + 'Response',
      'MessageID': uuid.v4(),
      'RelatesTo': normalizeHeaders(headers).messageid,
    }), '', 'wsa5', 'http://www.w3.org/2005/08/addressing');
    return server;
  }

  /** @internal */
  private setupWebsocketsServer(): WebSocket.Server {
    const server = new WebSocket.Server({ handleProtocols, noServer: true });
    server.on('error', (error) => {
      debug('websocket error: %s', error.message);
    });
    server.on('upgrade', (request, _socket, _head) => {
      debug('websocket upgrade: %s', request.url);
    });
    server.on('connection', (socket: WebSocket, _request: IncomingMessage, metadata: RequestMetadata) => this.handleConnection(socket, metadata));
    
    /** validate all pre-requisites before upgrading the websocket connection */
    this.httpServer.on('upgrade', async (httpRequest: IncomingMessage, socket, head: Buffer) => {
      debug('websocket upgrade: %s', httpRequest.url);
      if (!httpRequest.headers['sec-websocket-protocol']) {
        debug('websocket upgrade: no websocket protocol header, rejecting connection');
        socket.destroy();
        return;
      }
      const chargePointId = this.options.chargePointIdExtractor(httpRequest);
      if (!chargePointId) {
        debug('websocket upgrade: no charge point id(original url: %s), rejecting connection', httpRequest.url);
        socket.destroy();
        return;
      }
      const cpDebug = debug.extend(chargePointId);
      const metadata: RequestMetadata = { chargePointId, httpRequest };
      try {
        cpDebug('websocket upgrade: authorizing connection');
        const authorized = await this.options.websocketAuthorizer(metadata);
        cpDebug('websocket upgrade: authorization result: %s', authorized);
        if (!authorized) throw new Error('not authorized');
      } catch (error: any) {
        cpDebug('websocket upgrade: authorization error: %s', error.message);
        socket.destroy();
        return;
      }

      server.handleUpgrade(httpRequest, socket, head, function done(socket) {
        cpDebug('websocket upgrade: connection established');
        server.emit('connection', socket, httpRequest, metadata);
      });
    });
    return server;
  }

  /** @internal */
  private getSoapHandler(action: ActionName): ISoapServiceMethod {
    return async (request, respond, headers, httpRequest) => {
      const chargePointId = headers.chargeBoxIdentity;
      if (!chargePointId)
        throw new OCPPRequestError('No charge box identity was passed', 'GenericError');

      const response = await this.cpHandler({ action, ocppVersion: 'v1.5-soap', ...request }, {
        chargePointId,
        httpRequest,
      });

      if (!response)
        throw new OCPPRequestError('Could not answer request', 'InternalError');
      const { action: _, ocppVersion: __, ...responsePayload } = response;
      respond?.(responsePayload);
    }
  }

  /** @internal */
  private async handleConnection(socket: WebSocket, metadata: RequestMetadata) {
    const { chargePointId } = metadata;
    const cpDebug = debug.extend(chargePointId);
    cpDebug('websocket connection: handling connection');
    this.listeners.forEach((f) => f(chargePointId, 'connected'));

    let isAlive = true;
    socket.on('pong', () => {
      cpDebug('websocket connection: received pong');
      isAlive = true;
    });
    function noop() { }
    const pingInterval = setInterval(() => {
      if (isAlive === false) {
        cpDebug('websocket connection: connection is dead, closing');
        return socket.terminate();
      }
      isAlive = false;
      cpDebug('websocket connection: sending ping');
      socket.ping(noop);
    }, this.options.websocketPingInterval);

    const connection = new Connection(
      socket,
      // @ts-ignore, TS is not good with dependent typing, it doesn't realize that the function
      // returns OCPP v1.6 responses when the request is a OCPP v1.6 request
      (request, validationError) => this.cpHandler(request, { ...metadata, validationError }),
      chargePointActions,
      centralSystemActions,
      this.options.rejectInvalidRequests,
      {
        onReceiveRequest: message => this.options.onWebsocketRequestResponse?.('chargepoint', 'request', message, metadata),
        onSendResponse: message => this.options.onWebsocketRequestResponse?.('chargepoint', 'response', message, metadata),
        onReceiveResponse: message => this.options.onWebsocketRequestResponse?.('central-system', 'response', message, metadata),
        onSendRequest: message => this.options.onWebsocketRequestResponse?.('central-system', 'request', message, metadata),
      },
      this.options.websocketRequestTimeout,
    );

    if (!this.connections[chargePointId]) {
      cpDebug('websocket connection: creating new connection list entry');
      this.connections[chargePointId] = [];
    } else {
      cpDebug('websocket connection: adding to existing connection list entry(previous list length: %d)', this.connections[chargePointId].length);
    }
    this.connections[chargePointId].push(connection);

    socket.on('error', (error) => {
      cpDebug('websocket connection: socket error: %s', error.message);
      this.options.onWebsocketError?.(error, metadata);
    });
    socket.on('message', (data) => {
      cpDebug('websocket connection: received message: %s', data);
      this.options.onRawWebsocketData?.(data, metadata);
      connection.handleWebsocketData(data)
    });
    socket.on('close', () => {
      cpDebug('websocket connection: closing conection');
      const closedIndex = this.connections[chargePointId].findIndex(c => c === connection);
      this.connections[chargePointId].splice(closedIndex, 1);
      clearInterval(pingInterval);
      this.listeners.forEach((f) => f(chargePointId, 'disconnected'));
    });
  }
}
