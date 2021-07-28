import { Request, RequestHandler, Response } from '../messages';
import { CentralSystemAction, centralSystemActions } from '../messages/cs';
import WebSocket from 'ws';
import { Connection, SUPPORTED_PROTOCOLS } from '../ws';
import { ChargePointAction, chargePointActions } from '../messages/cp';
import { EitherAsync, Left } from 'purify-ts';
import { OCPPRequestError, ValidationError } from '../errors';
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

/**
 * Represents a connection to the central system
 *
 * @example
 * import { ChargePoint } from '@voltbras/ts-ocpp';
 *
 * const chargePointId = '123';
 * const centralSystemUrl = 'ws://central-system.com/ocpp';
 * const chargePoint = new ChargePoint(
 *  chargePointId,
 *  // request handler
 *  req => {
 *    if (req.action === 'RemoteStartTransaction')
 *      return {
 *        action: req.action,
 *        ocppVersion: req.ocppVersion,
 *        status: 'Accepted'
 *      };
 *    throw new Error('no handler defined')
 *  }),
 *  centralSystemUrl
 * );
 *
 * @category Charge Point
 */
export default class ChargePoint {
  private connection?: Connection<CentralSystemAction<'v1.6-json'>>;

  constructor(
    readonly id: string,
    private readonly requestHandler: RequestHandler<CentralSystemAction<'v1.6-json'>, ValidationError | undefined, 'v1.6-json'>,
    private readonly csUrl: string
  ) { }

  async connect(): Promise<Connection<CentralSystemAction<'v1.6-json'>>> {
    const url = `${this.csUrl}/${this.id}`;
    const socket = new WebSocket(url, SUPPORTED_PROTOCOLS);

    const connection = new Connection(
      socket,
      this.requestHandler,
      centralSystemActions,
      chargePointActions,
    );
    this.connection = connection;
    // this.socket.on('close', () => (this.socket = undefined));
    socket.on('error', console.error);
    socket.on('message', (data) => connection?.handleWebsocketData(data));

    return new Promise((resolve) => {
      socket?.on('open', () => resolve(connection));
    });
  }


  /**
   * @example
   * import { ChargePoint } from '@voltbras/ts-ocpp';
   * 
   * async function communicate(chargePoint: ChargePoint) {
   *   const response = await chargePoint.sendRequest({ action: 'Heartbeat', ocppVersion: 'v1.6-json', payload: {}});
   *   // it can be used in a functional way
   *   response.map(payload => payload.currentTime);
   *   // or can be used in the standard JS way(will throw if there was an error)
   *   const unsafeResponse = response.unsafeCoerce();
   * }
   */
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
