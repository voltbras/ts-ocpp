import { Timestamp } from '../../types';

type DiagnosticsStatus = 'Idle' | 'Uploaded' | 'UploadFailed' | 'Uploading';

type FirmwareStatus =
  | 'Downloaded'
  | 'DownloadFailed'
  | 'Downloading'
  | 'Idle'
  | 'FirmwareStatusNotification'
  | 'InstallationFailed'
  | 'Installing'
  | 'Installed';

type SampledValue = {
  context?: string;
  format?: string;
  location?: string;
  measurand?: string;
  phase?: string;
  unit?: string;

  value: string;
};

type TransactionDataItems = {
  sampledValues: SampledValue[];
  timestamp: Timestamp;
};

type MeterValue = {
  sampledValue: SampledValue[];
  timestamp: Timestamp; // TODO: maybe string?
};

type Authorize = {
  idTag: string;
};

type BootNotification = {
  chargeBoxSerialNumber?: string;
  chargePointModel: string;
  chargePointSerialNumber?: string;
  chargePointVendor: string;
  firmwareVersion?: string;
  iccid?: string;
  imsi?: string;
  meterSerialNumber?: string;
  meterType?: string;
};

type DataTransfer = {
  data: string;
  messageId?: string;
  vendorId?: string;
};

type DiagnosticsStatusNotification = {
  status: DiagnosticsStatus;
};

type FirmwareStatusNotification = {
  status: FirmwareStatus;
};

type Heartbeat = {};

type MeterValues = {
  connectorId: number;
  meterValue: MeterValue[];
  transactionId: number;
};

type StartTransaction = {
  connectorId: number;
  idTag: string;
  meterStart: number;
  reservationId?: number;
  timestamp: Timestamp; // TODO: maybe string?
};

type StatusNotification = {
  connectorId: number;
  errorCode: string; // TODO: cpstatus
  info?: string;
  status: string;
  timestamp?: Timestamp;
  vendorErrorCode?: string;
  vendorId?: string;
};

type StopTransaction = {
  idTag?: string;
  meterStop: number;
  reason?: string;
  timestamp: Timestamp;
  transactionData?: TransactionDataItems[];
  transactionId: number;
};

type ChargePointRequest =
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

export default ChargePointRequest;
