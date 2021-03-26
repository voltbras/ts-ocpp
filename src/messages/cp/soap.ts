import type * as soap from '../soap/wsdl/CentralSystemService/CentralSystemServiceSoap12';

type ChargePointMessage = {
  Authorize: {
    request: soap.IAuthorizeInput & { action: 'Authorize', ocppVersion: 'v1.5-soap' },
    response: soap.IAuthorizeOutput & { action: 'Authorize', ocppVersion: 'v1.5-soap' },
  };
  BootNotification: {
    request: soap.IBootNotificationInput & { action: 'BootNotification', ocppVersion: 'v1.5-soap' },
    response: soap.IBootNotificationOutput & { action: 'BootNotification', ocppVersion: 'v1.5-soap' },
  };
  DataTransfer: {
    request: soap.IDataTransferInput & { action: 'DataTransfer', ocppVersion: 'v1.5-soap' },
    response: soap.IDataTransferOutput & { action: 'DataTransfer', ocppVersion: 'v1.5-soap' },
  };
  DiagnosticsStatusNotification: {
    request: soap.IDiagnosticsStatusNotificationInput & { action: 'DiagnosticsStatusNotification', ocppVersion: 'v1.5-soap' },
    response: soap.IDiagnosticsStatusNotificationOutput & { action: 'DiagnosticsStatusNotification', ocppVersion: 'v1.5-soap' },
  };
  FirmwareStatusNotification: {
    request: soap.IFirmwareStatusNotificationInput & { action: 'FirmwareStatusNotification', ocppVersion: 'v1.5-soap' },
    response: soap.IFirmwareStatusNotificationOutput & { action: 'FirmwareStatusNotification', ocppVersion: 'v1.5-soap' },
  };
  Heartbeat: {
    request: soap.IHeartbeatInput & { action: 'Heartbeat', ocppVersion: 'v1.5-soap' },
    response: soap.IHeartbeatOutput & { action: 'Heartbeat', ocppVersion: 'v1.5-soap' },
  };
  MeterValues: {
    request: soap.IMeterValuesInput & { action: 'MeterValues', ocppVersion: 'v1.5-soap' },
    response: soap.IMeterValuesOutput & { action: 'MeterValues', ocppVersion: 'v1.5-soap' },
  };
  StartTransaction: {
    request: soap.IStartTransactionInput & { action: 'StartTransaction', ocppVersion: 'v1.5-soap' },
    response: soap.IStartTransactionOutput & { action: 'StartTransaction', ocppVersion: 'v1.5-soap' },
  };
  StatusNotification: {
    request: soap.IStatusNotificationInput & { action: 'StatusNotification', ocppVersion: 'v1.5-soap' },
    response: soap.IStatusNotificationOutput & { action: 'StatusNotification', ocppVersion: 'v1.5-soap' },
  };
  StopTransaction: {
    request: soap.IStopTransactionInput & { action: 'StopTransaction', ocppVersion: 'v1.5-soap' },
    response: soap.IStopTransactionOutput & { action: 'StopTransaction', ocppVersion: 'v1.5-soap' },
  };
}

export default ChargePointMessage;
