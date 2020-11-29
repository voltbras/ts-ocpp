import { RequestHandler } from "../messages";
import { CentralSystemAction, centralSystemActions } from "../messages/cs";
import WebSocket from 'ws';
import { Connection, SUPPORTED_PROTOCOLS } from "../ws";

export default class ChargePoint {
  constructor(
    private readonly cpId: string,
    private readonly requestHandler: RequestHandler<CentralSystemAction>,
    private readonly csUrl: string,
  ) { }

  connect() {
    const url = `${this.csUrl}/${this.cpId}`;
    const socket = new WebSocket(url, SUPPORTED_PROTOCOLS);

    const connection = new Connection(socket, this.requestHandler, centralSystemActions);
    socket.on('error', console.error);
    socket.on('message', data => connection.handleWebsocketData(data))
  }
}