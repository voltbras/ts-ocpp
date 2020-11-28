import type { IncomingMessage } from 'http';
import { ChargePointMessageHandler } from '..';
import { SUPPORTED_PROTOCOLS } from '../constants';
import WebSocket from 'ws';
import { createConnection } from './connection';

export type WebSocketsServerFactory = (
  port: number,
  host: string,
  cpHandler: ChargePointMessageHandler
) => WebSocket.Server;

export const createWebSocketsServer: WebSocketsServerFactory = (
  port,
  host,
  cpHandler
) => {
  const options: WebSocket.ServerOptions = {
    port,
    host,
    handleProtocols,
  };
  const server = new WebSocket.Server(options);

  server.on('error', console.error);
  server.on('upgrade', console.info);
  server.on('connection', (socket, request) =>
    onConnection(socket, request, cpHandler)
  );

  return server;
};

const handleProtocols = (protocols: string[]): string => {
  return (
    protocols.find((protocol) => SUPPORTED_PROTOCOLS.includes(protocol)) || ''
  );
};

const onConnection = (
  socket: WebSocket,
  request: IncomingMessage,
  cpHandler: ChargePointMessageHandler
): void => {
  if (!socket.protocol) {
    console.error('Closed connection: unsupported protocol');
    return socket.close();
  }
  const connection = createConnection(request, cpHandler);
  socket.on('message', connection.onMessage);
};
