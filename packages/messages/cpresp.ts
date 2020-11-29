type Authorize = {
  action: 'Authorize';
};

type BootNotification = {
  action: 'BootNotification';
};

type DataTransfer = {
  action: 'DataTransfer';
};

type DiagnosticsStatusNotification = {
  action: 'DiagnosticsStatusNotification';
};

type FirmwareStatusNotification = {
  action: 'FirmwareStatusNotification';
};

type Heartbeat = { action: 'Heartbeat' };

type MeterValues = {
  action: 'MeterValues';
};

type StartTransaction = {
  action: 'StartTransaction';
};

type StatusNotification = {
  action: 'StatusNotification';
};

type StopTransaction = {
  action: 'StopTransaction';
};

type ChargePointResponse =
  | Authorize
  | BootNotification
  | DataTransfer
  | DiagnosticsStatusNotification
  | FirmwareStatusNotification
  | Heartbeat
  | MeterValues
  | StartTransaction
  | StatusNotification
  | StopTransaction;

export default ChargePointResponse;