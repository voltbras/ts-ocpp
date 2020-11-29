import ChargePointRequest from './cpreq';
import ChargePointResponse from './cpresp';

export type ChargePointAction = ChargePointRequest['action'] | ChargePointResponse['action'];