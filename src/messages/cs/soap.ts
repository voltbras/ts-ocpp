import type * as soap from '../soap/wsdl/ChargePointService/ChargePointServiceSoap12';

type CentralSystemMessage = {
  CancelReservation: {
    request: soap.ICancelReservationInput & { action: 'CancelReservation', ocppVersion: 'v1.5-soap' },
    response: soap.ICancelReservationOutput & { action: 'CancelReservation', ocppVersion: 'v1.5-soap' },
  },
  ChangeAvailability: {
    request: soap.IChangeAvailabilityInput & { action: 'ChangeAvailability', ocppVersion: 'v1.5-soap' },
    response: soap.IChangeAvailabilityOutput & { action: 'ChangeAvailability', ocppVersion: 'v1.5-soap' },
  },
  ChangeConfiguration: {
    request: soap.IChangeConfigurationInput & { action: 'ChangeConfiguration', ocppVersion: 'v1.5-soap' },
    response: soap.IChangeConfigurationOutput & { action: 'ChangeConfiguration', ocppVersion: 'v1.5-soap' },
  },
  ClearCache: {
    request: soap.IClearCacheInput & { action: 'ClearCache', ocppVersion: 'v1.5-soap' },
    response: soap.IClearCacheOutput & { action: 'ClearCache', ocppVersion: 'v1.5-soap' },
  },
  // ClearChargingProfile: {
  //   request: soap.IClearChargingProfileInput & { action: 'ClearChargingProfile', ocppVersion: 'v1.5-soap' },
  //   response: soap.IClearChargingProfileOutput & { action: 'ClearChargingProfile', ocppVersion: 'v1.5-soap' },
  // },
  DataTransfer: {
    request: soap.IDataTransferInput & { action: 'DataTransfer', ocppVersion: 'v1.5-soap' },
    response: soap.IDataTransferOutput & { action: 'DataTransfer', ocppVersion: 'v1.5-soap' },
  },
  // GetCompositeSchedule: {
  //   request: soap.IGetCompositeScheduleInput & { action: 'GetCompositeSchedule', ocppVersion: 'v1.5-soap' },
  //   response: soap.IGetCompositeScheduleOutput & { action: 'GetCompositeSchedule', ocppVersion: 'v1.5-soap' },
  // },
  GetConfiguration: {
    request: soap.IGetConfigurationInput & { action: 'GetConfiguration', ocppVersion: 'v1.5-soap' },
    response: soap.IGetConfigurationOutput & { action: 'GetConfiguration', ocppVersion: 'v1.5-soap' },
  },
  GetDiagnostics: {
    request: soap.IGetDiagnosticsInput & { action: 'GetDiagnostics', ocppVersion: 'v1.5-soap' },
    response: soap.IGetDiagnosticsOutput & { action: 'GetDiagnostics', ocppVersion: 'v1.5-soap' },
  },
  GetLocalListVersion: {
    request: soap.IGetLocalListVersionInput & { action: 'GetLocalListVersion', ocppVersion: 'v1.5-soap' },
    response: soap.IGetLocalListVersionOutput & { action: 'GetLocalListVersion', ocppVersion: 'v1.5-soap' },
  },
  RemoteStartTransaction: {
    request: soap.IRemoteStartTransactionInput & { action: 'RemoteStartTransaction', ocppVersion: 'v1.5-soap' },
    response: soap.IRemoteStartTransactionOutput & { action: 'RemoteStartTransaction', ocppVersion: 'v1.5-soap' },
  },
  RemoteStopTransaction: {
    request: soap.IRemoteStopTransactionInput & { action: 'RemoteStopTransaction', ocppVersion: 'v1.5-soap' },
    response: soap.IRemoteStopTransactionOutput & { action: 'RemoteStopTransaction', ocppVersion: 'v1.5-soap' },
  },
  ReserveNow: {
    request: soap.IReserveNowInput & { action: 'ReserveNow', ocppVersion: 'v1.5-soap' },
    response: soap.IReserveNowOutput & { action: 'ReserveNow', ocppVersion: 'v1.5-soap' },
  },
  Reset: {
    request: soap.IResetInput & { action: 'Reset', ocppVersion: 'v1.5-soap' },
    response: soap.IResetOutput & { action: 'Reset', ocppVersion: 'v1.5-soap' },
  },
  SendLocalList: {
    request: soap.ISendLocalListInput & { action: 'SendLocalList', ocppVersion: 'v1.5-soap' },
    response: soap.ISendLocalListOutput & { action: 'SendLocalList', ocppVersion: 'v1.5-soap' },
  },
  // TriggerMessage: {
  //   request: soap.ITriggerMessageInput & { action: 'TriggerMessage', ocppVersion: 'v1.5-soap' },
  //   response: soap.ITriggerMessageOutput & { action: 'TriggerMessage', ocppVersion: 'v1.5-soap' },
  // },
  UnlockConnector: {
    request: soap.IUnlockConnectorInput & { action: 'UnlockConnector', ocppVersion: 'v1.5-soap' },
    response: soap.IUnlockConnectorOutput & { action: 'UnlockConnector', ocppVersion: 'v1.5-soap' },
  },
  UpdateFirmware: {
    request: soap.IUpdateFirmwareInput & { action: 'UpdateFirmware', ocppVersion: 'v1.5-soap' },
    response: soap.IUpdateFirmwareOutput & { action: 'UpdateFirmware', ocppVersion: 'v1.5-soap' },
  },
  // SetChargingProfile: {
  //   request: soap.ISetChargingProfileInput & { action: 'SetChargingProfile', ocppVersion: 'v1.5-soap' },
  //   response: soap.ISetChargingProfileOutput & { action: 'SetChargingProfile', ocppVersion: 'v1.5-soap' },
  // },
};

export default CentralSystemMessage;
