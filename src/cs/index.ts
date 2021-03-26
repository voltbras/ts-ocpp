import WebSocket from 'ws';
import { IncomingMessage, createServer, Server } from 'http';
import { ActionName, Request, RequestHandler, Response } from '../messages';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import { OCPPRequestError } from '../errors';
import { EitherAsync, Left } from 'purify-ts';
import * as fs from 'fs';
import * as path from 'path';
import * as soap from 'soap';
import { IServices, ISoapServiceMethod } from 'soap';
import { OCPPVersion } from '../types';
import SOAPConnection from '../soap/connection';

const handleProtocols = (protocols: string[]): string =>
  protocols.find((protocol) => SUPPORTED_PROTOCOLS.includes(protocol)) ?? '';

type ConnectionListener = (
  cpId: string,
  status: 'disconnected' | 'connected'
) => void;

type RequestMetadata = { chargePointId: string };

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


export default class CentralSystem {
  private cpHandler: RequestHandler<ChargePointAction, RequestMetadata>;
  private connections: Record<string, Connection<ChargePointAction>> = {};
  private listeners: ConnectionListener[] = [];
  private websocketsServer: WebSocket.Server;
  private httpServer: Server;

  constructor(
    port: number,
    cpHandler: RequestHandler<ChargePointAction, RequestMetadata>,
    host: string = '0.0.0.0'
  ) {
    this.cpHandler = cpHandler;

    this.httpServer = createServer();
    this.httpServer.listen(port, host);

    this.setupSoapServer();
    this.websocketsServer = this.setupWebsocketsServer();
  }

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
    soap.listen(this.httpServer, { services, path: '/', xml });
  }

  private setupWebsocketsServer(): WebSocket.Server {
    const server = new WebSocket.Server({ server: this.httpServer, handleProtocols });
    server.on('error', console.error);
    server.on('upgrade', console.info);
    server.on('connection', (socket, request) =>
      this.handleConnection(socket, request)
    );
    return server;
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

  private getSoapHandler(action: ActionName): ISoapServiceMethod {
    return async (request, respond, headers) => {
      const chargePointId = headers.chargeBoxIdentity;
      if (!chargePointId)
        throw new OCPPRequestError('No charge box identity was passed', 'GenericError');

      const response = await this.cpHandler({ action, ocppVersion: 'v1.5-soap', ...request }, { chargePointId });

      if (!response)
        throw new OCPPRequestError('Could not answer request', 'InternalError');
      const { action: _, ocppVersion: __, ...responsePayload } = response;
      respond?.(responsePayload);
    }
  }

  private handleConnection(socket: WebSocket, request: IncomingMessage) {
    if (!socket.protocol) {
      socket.close();
      return;
    }
    const cpId = request.url?.split('/').pop();
    if (!cpId) {
      socket.close();
      return;
    }

    this.listeners.forEach((f) => f(cpId, 'connected'));

    const connection = new Connection(
      socket,
      // @ts-ignore, TS is not good with dependent typing, it doesn't realize that the function
      // returns OCPP v1.6 responses when the request is a OCPP v1.6 request
      (request) => this.cpHandler(request, { chargePointId: cpId }, 'v1.6-json'),
      chargePointActions,
      centralSystemActions,
    );
    this.connections[cpId] = connection;

    socket.on('message', (data) => connection.handleWebsocketData(data));
    socket.on('close', () => {
      delete this.connections[cpId];
      this.listeners.forEach((f) => f(cpId, 'disconnected'));
    });
  }
}
