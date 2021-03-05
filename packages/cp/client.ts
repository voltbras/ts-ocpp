import { Request, RequestHandler, Response } from '../messages';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import WebSocket from 'ws';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { EitherAsync, Left } from 'purify-ts';
import { OCPPRequestError } from '../errors';

export default class ChargePoint {
  private connection?: Connection<CentralSystemAction>;

  constructor(
    private readonly cpId: string,
    private readonly requestHandler: RequestHandler<CentralSystemAction>,
    private readonly csUrl: string
  ) { }

  async connect(): Promise<void> {
    const url = `${this.csUrl}/${this.cpId}`;
    const socket = new WebSocket(url, SUPPORTED_PROTOCOLS);

    this.connection = new Connection<CentralSystemAction>(
      socket,
      this.requestHandler,
      centralSystemActions,
      chargePointActions,
    );
    // this.socket.on('close', () => (this.socket = undefined));
    socket.on('error', console.error);
    socket.on('message', (data) => this.connection?.handleWebsocketData(data));

    return new Promise((resolve) => {
      socket?.on('open', () => resolve());
    });
  }

  sendRequest<T extends ChargePointAction>(action: T, payload: Omit<Request<T>, 'action'>): EitherAsync<OCPPRequestError, Response<T>> {
    return EitherAsync.fromPromise(async () => {
      if (!this.connection) return Left(new OCPPRequestError('there is no connection to the central system'));
      // @ts-ignore - TS somehow doesn't understand that this is right
      const request: Request<T> = { ...payload, action };
      return await this.connection.sendRequest(action, request);
    })
  }

  close() {
    this.connection?.close();
  }
}
