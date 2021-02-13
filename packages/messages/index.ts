import ChargePointMessage, { ChargePointAction } from './cp';
import CentralSystemMessage, { CentralSystemAction } from './cs';

export type ActionName = ChargePointAction | CentralSystemAction;
export type ReqRes<T extends ActionName> =
  T extends ChargePointAction
  ? ChargePointMessage[T]
  : T extends CentralSystemAction
  ? CentralSystemMessage[T]
  : never;

export type Request<T extends ActionName> = ReqRes<T>['request'];
export type Response<T extends ActionName> = ReqRes<T>['response'];

export type Result<T> = Promise<EitherTuple<T>> | EitherTuple<T>;
export type EitherTuple<T> = [T, undefined] | [undefined, Error];

/**
 * TS is still not very good with dependent-typing
 * (i.e. making the return type differ on the input type)
 * so when using this it is advisable to do type assertions.
 */
export type RequestHandler<T extends ActionName, Metadata = undefined> =
  (request: Request<T>, extra: Metadata) => Result<Response<T>>;

