import { RequestHandler } from '../messages';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import WebSocket from 'ws';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';

export default class ChargePoint {
  private socket?: WebSocket;

  constructor(
    private readonly cpId: string,
    private readonly requestHandler: RequestHandler<CentralSystemAction>,
    private readonly csUrl: string
  ) {}

  async connect() {
    const url = `${this.csUrl}/${this.cpId}`;
    this.socket = new WebSocket(url, SUPPORTED_PROTOCOLS);

    const connection = new Connection(
      this.socket,
      this.requestHandler,
      centralSystemActions
    );
    // this.socket.on('close', () => (this.socket = undefined));
    this.socket.on('error', console.error);
    this.socket.on('message', (data) => connection.handleWebsocketData(data));

    return new Promise((resolve) => {
      this.socket?.on('open', () => resolve(console.log(!!this.socket)));
    });
  }

  close() {
    this.socket?.close();
  }
}
