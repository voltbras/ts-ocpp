import { Request, RequestHandler, Response } from '../messages';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import WebSocket from 'ws';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { EitherAsync, Left } from 'purify-ts';
import { OCPPRequestError } from '../errors';
import { OCPPVersion } from '../types';

export type CPSendRequestArgs<T extends ChargePointAction<V>, V extends OCPPVersion> = {
  ocppVersion: 'v1.6-json',
  payload: Omit<Request<T, V>, 'action' | 'ocppVersion'>,
  action: T,
};
// | {
//   ocppVersion: 'v1.5-soap',
//   chargePointUrl: string,
//   chargePointId: string,
//   payload: Omit<Request<T, V>, 'action' | 'ocppVersion'>,
//   action: T,
// };

export default class ChargePoint {
  private connection?: Connection<CentralSystemAction<'v1.6-json'>>;

  constructor(
    private readonly cpId: string,
    private readonly requestHandler: RequestHandler<CentralSystemAction<'v1.6-json'>, undefined, 'v1.6-json'>,
    private readonly csUrl: string
  ) { }

  async connect(): Promise<void> {
    const url = `${this.csUrl}/${this.cpId}`;
    const socket = new WebSocket(url, SUPPORTED_PROTOCOLS);

    this.connection = new Connection(
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

  sendRequest<T extends ChargePointAction>(args: CPSendRequestArgs<T, 'v1.6-json'>): EitherAsync<OCPPRequestError, Response<T>> {
    return EitherAsync.fromPromise(async () => {
      if (!this.connection) return Left(new OCPPRequestError('there is no connection to the central system'));
      const request = {
        ...args.payload,
        action: args.action,
        ocppVersion: args.ocppVersion
      } as Request<T, 'v1.6-json'>;
      return await this.connection.sendRequest(args.action, request);
    })
  }

  close() {
    this.connection?.close();
  }
}
