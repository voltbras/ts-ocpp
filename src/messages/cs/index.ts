import { OCPPVersion, OCPPVersionV15, OCPPVersionV16 } from '../../types';
import JSONCentralSystemMessage from './json';
import SOAPCentralSystemMessage from './soap';

type CentralSystemMessage<V extends OCPPVersion = OCPPVersion> =
  V extends OCPPVersionV16
  ? JSONCentralSystemMessage
  : V extends OCPPVersionV15
  ? SOAPCentralSystemMessage
  : never;

export type CentralSystemAction<V extends OCPPVersion = OCPPVersion> = keyof CentralSystemMessage<V>;


export const centralSystemActions: CentralSystemAction<'v1.6-json'>[] = [
  "ClearCache",
  "ClearChargingProfile",
  "DataTransfer",
  "GetCompositeSchedule",
  "GetConfiguration",
  "GetDiagnostics",
  "GetLocalListVersion",
  "RemoteStartTransaction",
  "RemoteStopTransaction",
  "ReserveNow",
  "Reset",
  "SendLocalList",
  "SetChargingProfile",
  "TriggerMessage",
  "UnlockConnector",
  "UpdateFirmware"
];

export const soapCentralSystemActions: CentralSystemAction<'v1.5-soap'>[] = [
  "ClearCache",
  "DataTransfer",
  "GetConfiguration",
  "GetDiagnostics",
  "GetLocalListVersion",
  "RemoteStartTransaction",
  "RemoteStopTransaction",
  "ReserveNow",
  "Reset",
  "SendLocalList",
  "UnlockConnector",
  "UpdateFirmware"
];

export type CentralSystemRequest<T extends CentralSystemAction, V extends OCPPVersion = OCPPVersion> = CentralSystemMessage<V>[T]['request'];
export type CentralSystemResponse<T extends CentralSystemAction, V extends OCPPVersion = OCPPVersion> = CentralSystemMessage<V>[T]['response'];

export default CentralSystemMessage;
