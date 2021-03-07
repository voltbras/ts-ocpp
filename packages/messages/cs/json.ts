import type * as request from '../json/request';
import type * as response from '../json/response';

type CentralSystemMessage = {
  CancelReservation: {
    request: request.CancelReservationRequest & { action: 'CancelReservation', ocppVersion: 'v1.6-json' },
    response: response.CancelReservationResponse & { action: 'CancelReservation', ocppVersion: 'v1.6-json' },
  },
  ChangeAvailability: {
    request: request.ChangeAvailabilityRequest & { action: 'ChangeAvailability', ocppVersion: 'v1.6-json' },
    response: response.ChangeAvailabilityResponse & { action: 'ChangeAvailability', ocppVersion: 'v1.6-json' },
  },
  ChangeConfiguration: {
    request: request.ChangeConfigurationRequest & { action: 'ChangeConfiguration', ocppVersion: 'v1.6-json' },
    response: response.ChangeConfigurationResponse & { action: 'ChangeConfiguration', ocppVersion: 'v1.6-json' },
  },
  ClearCache: {
    request: request.ClearCacheRequest & { action: 'ClearCache', ocppVersion: 'v1.6-json' },
    response: response.ClearCacheResponse & { action: 'ClearCache', ocppVersion: 'v1.6-json' },
  },
  ClearChargingProfile: {
    request: request.ClearChargingProfileRequest & { action: 'ClearChargingProfile', ocppVersion: 'v1.6-json' },
    response: response.ClearChargingProfileResponse & { action: 'ClearChargingProfile', ocppVersion: 'v1.6-json' },
  },
  DataTransfer: {
    request: request.DataTransferRequest & { action: 'DataTransfer', ocppVersion: 'v1.6-json' },
    response: response.DataTransferResponse & { action: 'DataTransfer', ocppVersion: 'v1.6-json' },
  },
  GetCompositeSchedule: {
    request: request.GetCompositeScheduleRequest & { action: 'GetCompositeSchedule', ocppVersion: 'v1.6-json' },
    response: response.GetCompositeScheduleResponse & { action: 'GetCompositeSchedule', ocppVersion: 'v1.6-json' },
  },
  GetConfiguration: {
    request: request.GetConfigurationRequest & { action: 'GetConfiguration', ocppVersion: 'v1.6-json' },
    response: response.GetConfigurationResponse & { action: 'GetConfiguration', ocppVersion: 'v1.6-json' },
  },
  GetDiagnostics: {
    request: request.GetDiagnosticsRequest & { action: 'GetDiagnostics', ocppVersion: 'v1.6-json' },
    response: response.GetDiagnosticsResponse & { action: 'GetDiagnostics', ocppVersion: 'v1.6-json' },
  },
  GetLocalListVersion: {
    request: request.GetLocalListVersionRequest & { action: 'GetLocalListVersion', ocppVersion: 'v1.6-json' },
    response: response.GetLocalListVersionResponse & { action: 'GetLocalListVersion', ocppVersion: 'v1.6-json' },
  },
  RemoteStartTransaction: {
    request: request.RemoteStartTransactionRequest & { action: 'RemoteStartTransaction', ocppVersion: 'v1.6-json' },
    response: response.RemoteStartTransactionResponse & { action: 'RemoteStartTransaction', ocppVersion: 'v1.6-json' },
  },
  RemoteStopTransaction: {
    request: request.RemoteStopTransactionRequest & { action: 'RemoteStopTransaction', ocppVersion: 'v1.6-json' },
    response: response.RemoteStopTransactionResponse & { action: 'RemoteStopTransaction', ocppVersion: 'v1.6-json' },
  },
  ReserveNow: {
    request: request.ReserveNowRequest & { action: 'ReserveNow', ocppVersion: 'v1.6-json' },
    response: response.ReserveNowResponse & { action: 'ReserveNow', ocppVersion: 'v1.6-json' },
  },
  Reset: {
    request: request.ResetRequest & { action: 'Reset', ocppVersion: 'v1.6-json' },
    response: response.ResetResponse & { action: 'Reset', ocppVersion: 'v1.6-json' },
  },
  SendLocalList: {
    request: request.SendLocalListRequest & { action: 'SendLocalList', ocppVersion: 'v1.6-json' },
    response: response.SendLocalListResponse & { action: 'SendLocalList', ocppVersion: 'v1.6-json' },
  },
  TriggerMessage: {
    request: request.TriggerMessageRequest & { action: 'TriggerMessage', ocppVersion: 'v1.6-json' },
    response: response.TriggerMessageResponse & { action: 'TriggerMessage', ocppVersion: 'v1.6-json' },
  },
  UnlockConnector: {
    request: request.UnlockConnectorRequest & { action: 'UnlockConnector', ocppVersion: 'v1.6-json' },
    response: response.UnlockConnectorResponse & { action: 'UnlockConnector', ocppVersion: 'v1.6-json' },
  },
  UpdateFirmware: {
    request: request.UpdateFirmwareRequest & { action: 'UpdateFirmware', ocppVersion: 'v1.6-json' },
    response: response.UpdateFirmwareResponse & { action: 'UpdateFirmware', ocppVersion: 'v1.6-json' },
  },
  SetChargingProfile: {
    request: request.SetChargingProfileRequest & { action: 'SetChargingProfile', ocppVersion: 'v1.6-json' },
    response: response.SetChargingProfileResponse & { action: 'SetChargingProfile', ocppVersion: 'v1.6-json' },
  },
};

export default CentralSystemMessage;
