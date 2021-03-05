import type * as request from './json/request';
import type * as response from './json/response';

type ChargePointMessage = {
  Authorize: {
    request: request.AuthorizeRequest & { action: 'Authorize' },
    response: response.AuthorizeResponse & { action: 'Authorize' },
  };
  BootNotification: {
    request: request.BootNotificationRequest & { action: 'BootNotification' },
    response: response.BootNotificationResponse & { action: 'BootNotification' },
  };
  DataTransfer: {
    request: request.DataTransferRequest & { action: 'DataTransfer' },
    response: response.DataTransferResponse & { action: 'DataTransfer' },
  };
  DiagnosticsStatusNotification: {
    request: request.DiagnosticsStatusNotificationRequest & { action: 'DiagnosticsStatusNotification' },
    response: response.DiagnosticsStatusNotificationResponse & { action: 'DiagnosticsStatusNotification' },
  };
  FirmwareStatusNotification: {
    request: request.FirmwareStatusNotificationRequest & { action: 'FirmwareStatusNotification' },
    response: response.FirmwareStatusNotificationResponse & { action: 'FirmwareStatusNotification' },
  };
  Heartbeat: {
    request: request.HeartbeatRequest & { action: 'Heartbeat' },
    response: response.HeartbeatResponse & { action: 'Heartbeat' },
  };
  MeterValues: {
    request: request.MeterValuesRequest & { action: 'MeterValues' },
    response: response.MeterValuesResponse & { action: 'MeterValues' },
  };
  StartTransaction: {
    request: request.StartTransactionRequest & { action: 'StartTransaction' },
    response: response.StartTransactionResponse & { action: 'StartTransaction' },
  };
  StatusNotification: {
    request: request.StatusNotificationRequest & { action: 'StatusNotification' },
    response: response.StatusNotificationResponse & { action: 'StatusNotification' },
  };
  StopTransaction: {
    request: request.StopTransactionRequest & { action: 'StopTransaction' },
    response: response.StopTransactionResponse & { action: 'StopTransaction' },
  };
}
export type ChargePointAction = keyof ChargePointMessage;

export const chargePointActions: ChargePointAction[] = [
  "Authorize",
  "BootNotification",
  "DataTransfer",
  "DiagnosticsStatusNotification",
  "FirmwareStatusNotification",
  "Heartbeat",
  "MeterValues",
  "StartTransaction",
  "StatusNotification",
  "StopTransaction"
];

export type ChargePointRequest<T extends ChargePointAction> = ChargePointMessage[T]['request'];
export type ChargePointResponse<T extends ChargePointAction> = ChargePointMessage[T]['response'];

export default ChargePointMessage;
