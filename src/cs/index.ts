/**
 * Sets up a central system, that can communicate with charge points
 */
import WebSocket from 'ws';
import { IncomingMessage, createServer, Server, ServerResponse } from 'http';
import { ActionName, Request, RequestHandler, Response } from '../messages';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';
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
  onRawWebsocketData?: (data: WebSocket.Data, metadata: Omit<RequestMetadata, 'validationError'>) => void
}

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
  private connections: Record<string, Connection<ChargePointAction>> = {};
  private listeners: ConnectionListener[] = [];
  private websocketsServer: WebSocket.Server;
  private soapServer: soap.Server;
  private httpServer: Server;
  private options: CentralSystemOptions;

  constructor(
    port: number,
    cpHandler: RequestHandler<ChargePointAction, RequestMetadata>,
    options: CentralSystemOptions = {},
  ) {
    this.cpHandler = cpHandler;
    const host = options.host ?? '0.0.0.0';
    this.options = {
      ...options,
      rejectInvalidRequests: options.rejectInvalidRequests ?? true
    };

    this.httpServer = createServer();
    this.httpServer.on('connection', socket => {
      options.onRawSocketData &&
        socket.on('data', data => options.onRawSocketData?.(data));
    })
    this.httpServer.listen(port, host);

    this.soapServer = this.setupSoapServer();
    this.websocketsServer = this.setupWebsocketsServer();
  }

  public addConnectionListener(listener: ConnectionListener) {
    this.listeners.push(listener);
  }

  public close() {
    this.httpServer.close();
    this.websocketsServer.close();
  }

  sendRequest<V extends OCPPVersion, T extends CentralSystemAction>(args: CSSendRequestArgs<T, V>): EitherAsync<OCPPRequestError, Response<T, V>> {
    return EitherAsync.fromPromise(async () => {
      const { chargePointId, payload, action } = args;
      if (!chargePointId) return Left(new OCPPRequestError('charge point id was not provided'));
      // @ts-ignore - TS somehow doesn't understand that this is right
      const request: Request<T, V> = { ...payload, action, ocppVersion: args.ocppVersion };

      switch (args.ocppVersion) {
        case 'v1.6-json': {
          const connection = this.connections[args.chargePointId];
          if (!connection) return Left(new OCPPRequestError('there is no connection to this charge point'));

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

    server.addSoapHeader((action: any, args: any, headers: Record<string, string>) => ({
      chargeBoxIdentity: normalizeHeaders(headers).chargeboxidentity
    }), '', 'ocpp', 'urn://Ocpp/Cs/2012/06/');
    server.addSoapHeader((action: any, args: any, headers: any) => ({
      'Action': '/' + action + 'Response',
      'MessageID': uuid.v4(),
      'RelatesTo': normalizeHeaders(headers).messageid,
    }), '', 'wsa5', 'http://www.w3.org/2005/08/addressing');
    return server;
  }

  /** @internal */
  private setupWebsocketsServer(): WebSocket.Server {
    const server = new WebSocket.Server({ server: this.httpServer, handleProtocols });
    server.on('error', console.error);
    server.on('upgrade', console.info);
    server.on('connection', (socket, request) => this.handleConnection(socket, request));
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
  private handleConnection(socket: WebSocket, httpRequest: IncomingMessage) {
    if (!socket.protocol) {
      socket.close();
      return;
    }
    const chargePointId = httpRequest.url?.split('/').pop();
    if (!chargePointId) {
      socket.close();
      return;
    }

    this.listeners.forEach((f) => f(chargePointId, 'connected'));

    const metadata: RequestMetadata = { chargePointId, httpRequest };
    const connection = new Connection(
      socket,
      // @ts-ignore, TS is not good with dependent typing, it doesn't realize that the function
      // returns OCPP v1.6 responses when the request is a OCPP v1.6 request
      (request, validationError) => this.cpHandler(request, { ...metadata, validationError }),
      chargePointActions,
      centralSystemActions,
      this.options.rejectInvalidRequests,
    );
    this.connections[chargePointId] = connection;

    socket.on('message', (data) => {
      this.options.onRawWebsocketData?.(data, metadata);
      connection.handleWebsocketData(data)
    });
    socket.on('close', () => {
      delete this.connections[chargePointId];
      this.listeners.forEach((f) => f(chargePointId, 'disconnected'));
    });
  }
}
