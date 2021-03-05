import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { Request, RequestHandler, Response } from '../messages';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';
import { CentralSystemAction } from '../messages/cs';
import { OCPPRequestError } from '../errors';
import { EitherAsync, Left } from 'purify-ts';

const handleProtocols = (protocols: string[]): string =>
  protocols.find((protocol) => SUPPORTED_PROTOCOLS.includes(protocol)) ?? '';

type ConnectionListener = (
  cpId: string,
  status: 'disconnected' | 'connected'
) => void;

type RequestMetadata = { chargePointId: string };

export default class CentralSystem {
  private cpHandler: RequestHandler<ChargePointAction, RequestMetadata>;
  private connections: Record<string, Connection<ChargePointAction>> = {};
  private listeners: ConnectionListener[] = [];
  private server: WebSocket.Server;

  constructor(
    port: number,
    cpHandler: RequestHandler<ChargePointAction, RequestMetadata>,
    host: string = '0.0.0.0'
  ) {
    this.cpHandler = cpHandler;

    this.server = new WebSocket.Server({
      port,
      host,
      handleProtocols,
    });

    this.server.on('error', console.error);
    this.server.on('upgrade', console.info);
    this.server.on('connection', (socket, request) =>
      this.handleConnection(socket, request)
    );
  }

  public addConnectionListener(listener: ConnectionListener) {
    this.listeners.push(listener);
  }

  public close() {
    this.server.close();
  }

  sendRequest<T extends CentralSystemAction>(cpId: string, action: T, payload: Omit<Request<T>, 'action'>): EitherAsync<OCPPRequestError, Response<T>> {
    return EitherAsync.fromPromise(async () => {
      if (!cpId) return Left(new OCPPRequestError('charge point id was not provided'));
      const connection = this.connections[cpId];
      if (!connection) return Left(new OCPPRequestError('there is no connection to this charge point'));
      // @ts-ignore - TS somehow doesn't understand that this is right
      const request: Request<T> = { ...payload, action };
      return connection.sendRequest(action, request);
    })
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
      (request) => this.cpHandler(request, { chargePointId: cpId }),
      chargePointActions
    );
    this.connections[cpId] = connection;

    socket.on('message', (data) => connection.handleWebsocketData(data));
    socket.on('close', () => {
      delete this.connections[cpId];
      this.listeners.forEach((f) => f(cpId, 'disconnected'));
    });
  }
}
