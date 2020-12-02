import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { RequestHandler } from '../messages';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';

const handleProtocols = (protocols: string[]): string =>
  protocols.find((protocol) => SUPPORTED_PROTOCOLS.includes(protocol)) ?? '';

type ConnectionListener = (
  cpId: string,
  status: 'disconnected' | 'connected'
) => void;

export default class CentralSystem {
  private cpHandler: RequestHandler<ChargePointAction, string>;
  private connections: Record<string, Connection<ChargePointAction>> = {};
  private listeners: ConnectionListener[] = [];
  private server: WebSocket.Server;

  constructor(
    port: number,
    cpHandler: RequestHandler<ChargePointAction, string>,
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
      (request) => this.cpHandler(request, cpId),
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
