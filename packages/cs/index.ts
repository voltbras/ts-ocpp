import { ChargePointAction } from "../messages/cp";
import ChargePointRequest from '../messages/cpreq/index';
import ChargePointResponse from '../messages/cpresp';

export type ChargePointMessageHandler = (
  cpRequest: ChargePointRequest,
  cpId: string
) => [Omit<ChargePointResponse, 'action'>, undefined] | [undefined, Error];
