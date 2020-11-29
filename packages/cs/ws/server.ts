import { SUPPORTED_PROTOCOLS } from '../constants';
import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import Connection from './connection';
import { ChargePointMessageHandler } from '..';

const handleProtocols = (protocols: string[]): string =>
  protocols.find((protocol) => SUPPORTED_PROTOCOLS.includes(protocol)) ?? '';

export default class WebsocketsOCPPServer {
  private cpHandler: ChargePointMessageHandler;
  private connections: Record<string, Connection> = {};

  constructor(
    port: number,
    host: string,
    cpHandler: ChargePointMessageHandler
  ) {
    this.cpHandler = cpHandler;

    const server = new WebSocket.Server({
      port,
      host,
      handleProtocols,
    });

    server.on('error', console.error);
    server.on('upgrade', console.info);
    server.on('connection', (socket, request) => this.handleConnection(socket, request));
  }

  private handleConnection(socket: WebSocket, request: IncomingMessage) {
    if (!socket.protocol) { socket.close(); return; }
    const cpId = request.url?.split('/').pop();
    if (!cpId) { socket.close(); return; }

    const connection = new Connection(cpId, socket, this.cpHandler);
    this.connections[cpId] = connection;

    socket.on('message', data => connection.handleWebsocketData(data));
    socket.on('close', () => delete this.connections[cpId]);
  }
}