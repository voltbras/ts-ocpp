import type * as request from './json/request';
import type * as response from './json/response';

type CentralSystemMessage = {
  CancelReservation: {
    request: request.CancelReservationRequest & { action: 'CancelReservation' },
    response: response.CancelReservationResponse & { action: 'CancelReservation' },
  },
  ChangeAvailability: {
    request: request.ChangeAvailabilityRequest & { action: 'ChangeAvailability' },
    response: response.ChangeAvailabilityResponse & { action: 'ChangeAvailability' },
  },
  ChangeConfiguration: {
    request: request.ChangeConfigurationRequest & { action: 'ChangeConfiguration' },
    response: response.ChangeConfigurationResponse & { action: 'ChangeConfiguration' },
  },
  ClearCache: {
    request: request.ClearCacheRequest & { action: 'ClearCache' },
    response: response.ClearCacheResponse & { action: 'ClearCache' },
  },
  ClearChargingProfile: {
    request: request.ClearChargingProfileRequest & { action: 'ClearChargingProfile' },
    response: response.ClearChargingProfileResponse & { action: 'ClearChargingProfile' },
  },
  DataTransfer: {
    request: request.DataTransferRequest & { action: 'DataTransfer' },
    response: response.DataTransferResponse & { action: 'DataTransfer' },
  },
  GetCompositeSchedule: {
    request: request.GetCompositeScheduleRequest & { action: 'GetCompositeSchedule' },
    response: response.GetCompositeScheduleResponse & { action: 'GetCompositeSchedule' },
  },
  GetConfiguration: {
    request: request.GetConfigurationRequest & { action: 'GetConfiguration' },
    response: response.GetConfigurationResponse & { action: 'GetConfiguration' },
  },
  GetDiagnostics: {
    request: request.GetDiagnosticsRequest & { action: 'GetDiagnostics' },
    response: response.GetDiagnosticsResponse & { action: 'GetDiagnostics' },
  },
  GetLocalListVersion: {
    request: request.GetLocalListVersionRequest & { action: 'GetLocalListVersion' },
    response: response.GetLocalListVersionResponse & { action: 'GetLocalListVersion' },
  },
  RemoteStartTransaction: {
    request: request.RemoteStartTransactionRequest & { action: 'RemoteStartTransaction' },
    response: response.RemoteStartTransactionResponse & { action: 'RemoteStartTransaction' },
  },
  RemoteStopTransaction: {
    request: request.RemoteStopTransactionRequest & { action: 'RemoteStopTransaction' },
    response: response.RemoteStopTransactionResponse & { action: 'RemoteStopTransaction' },
  },
  ReserveNow: {
    request: request.ReserveNowRequest & { action: 'ReserveNow' },
    response: response.ReserveNowResponse & { action: 'ReserveNow' },
  },
  Reset: {
    request: request.ResetRequest & { action: 'Reset' },
    response: response.ResetResponse & { action: 'Reset' },
  },
  SendLocalList: {
    request: request.SendLocalListRequest & { action: 'SendLocalList' },
    response: response.SendLocalListResponse & { action: 'SendLocalList' },
  },
  TriggerMessage: {
    request: request.TriggerMessageRequest & { action: 'TriggerMessage' },
    response: response.TriggerMessageResponse & { action: 'TriggerMessage' },
  },
  UnlockConnector: {
    request: request.UnlockConnectorRequest & { action: 'UnlockConnector' },
    response: response.UnlockConnectorResponse & { action: 'UnlockConnector' },
  },
  UpdateFirmware: {
    request: request.UpdateFirmwareRequest & { action: 'UpdateFirmware' },
    response: response.UpdateFirmwareResponse & { action: 'UpdateFirmware' },
  },
  SetChargingProfile: {
    request: request.SetChargingProfileRequest & { action: 'SetChargingProfile' },
    response: response.SetChargingProfileResponse & { action: 'SetChargingProfile' },
  },
};

export type CentralSystemAction = keyof CentralSystemMessage;

export const centralSystemActions: CentralSystemAction[] = [
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

export type CentralSystemRequest<T extends CentralSystemAction> = CentralSystemMessage[T]['request'];
export type CentralSystemResponse<T extends CentralSystemAction> = CentralSystemMessage[T]['response'];

export default CentralSystemMessage;
