import type * as request from '../json/request';
import type * as response from '../json/response';

type ChargePointMessage = {
  Authorize: {
    request: request.AuthorizeRequest & { action: 'Authorize', ocppVersion: 'v1.6-json' },
    response: response.AuthorizeResponse & { action: 'Authorize', ocppVersion: 'v1.6-json' },
  };
  BootNotification: {
    request: request.BootNotificationRequest & { action: 'BootNotification', ocppVersion: 'v1.6-json' },
    response: response.BootNotificationResponse & { action: 'BootNotification', ocppVersion: 'v1.6-json' },
  };
  DataTransfer: {
    request: request.DataTransferRequest & { action: 'DataTransfer', ocppVersion: 'v1.6-json' },
    response: response.DataTransferResponse & { action: 'DataTransfer', ocppVersion: 'v1.6-json' },
  };
  DiagnosticsStatusNotification: {
    request: request.DiagnosticsStatusNotificationRequest & { action: 'DiagnosticsStatusNotification', ocppVersion: 'v1.6-json' },
    response: response.DiagnosticsStatusNotificationResponse & { action: 'DiagnosticsStatusNotification', ocppVersion: 'v1.6-json' },
  };
  FirmwareStatusNotification: {
    request: request.FirmwareStatusNotificationRequest & { action: 'FirmwareStatusNotification', ocppVersion: 'v1.6-json' },
    response: response.FirmwareStatusNotificationResponse & { action: 'FirmwareStatusNotification', ocppVersion: 'v1.6-json' },
  };
  Heartbeat: {
    request: request.HeartbeatRequest & { action: 'Heartbeat', ocppVersion: 'v1.6-json' },
    response: response.HeartbeatResponse & { action: 'Heartbeat', ocppVersion: 'v1.6-json' },
  };
  MeterValues: {
    request: request.MeterValuesRequest & { action: 'MeterValues', ocppVersion: 'v1.6-json' },
    response: response.MeterValuesResponse & { action: 'MeterValues', ocppVersion: 'v1.6-json' },
  };
  StartTransaction: {
    request: request.StartTransactionRequest & { action: 'StartTransaction', ocppVersion: 'v1.6-json' },
    response: response.StartTransactionResponse & { action: 'StartTransaction', ocppVersion: 'v1.6-json' },
  };
  StatusNotification: {
    request: request.StatusNotificationRequest & { action: 'StatusNotification', ocppVersion: 'v1.6-json' },
    response: response.StatusNotificationResponse & { action: 'StatusNotification', ocppVersion: 'v1.6-json' },
  };
  StopTransaction: {
    request: request.StopTransactionRequest & { action: 'StopTransaction', ocppVersion: 'v1.6-json' },
    response: response.StopTransactionResponse & { action: 'StopTransaction', ocppVersion: 'v1.6-json' },
  };
}

export default ChargePointMessage;
