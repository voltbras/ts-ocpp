import { RequestHandler } from '../messages';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import WebSocket from 'ws';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';

export default class ChargePoint {
  private socket: WebSocket | undefined;
  private socketConnected = false;

  constructor(
    private readonly cpId: string,
    private readonly requestHandler: RequestHandler<CentralSystemAction>,
    private readonly csUrl: string
  ) {}

  connect() {
    const url = `${this.csUrl}/${this.cpId}`;
    this.socket = new WebSocket(url, SUPPORTED_PROTOCOLS);

    const connection = new Connection(
      this.socket,
      this.requestHandler,
      centralSystemActions
    );
    this.socket.on('open', () => (this.socketConnected = true));
    this.socket.on('error', console.error);
    this.socket.on('message', (data) => connection.handleWebsocketData(data));
  }

  close() {
    if (this.socketConnected) this.socket?.terminate();
  }
}
