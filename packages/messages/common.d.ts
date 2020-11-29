import { Timestamp } from "../types";

export type AvailabilityType = 'Inoperative' | 'Operative';

export type AuthorizationStatus =
  | 'Accepted'
  | 'Blocked'
  | 'Expired'
  | 'Invalid'
  | 'ConcurrentTx';

export type ResetType = 'Hard' | 'Soft';

export type ChargingProfile = {
  chargingProfileId: number;
  chargingProfileKind: string;
  chargingProfilePurpose: string;
  chargingSchedule: ChargingSchedule;
  recurrencyKind?: string;
  stackLevel: number;
  transactionId?: number;
  validFrom?: Timestamp;
  validTo?: Timestamp;
};


export type CentralSystemChargingProfile = {
  chargingProfileId: number;
  chargingProfileKind: string;
  chargingProfilePurpose: string;
  chargingSchedule: ChargingSchedule;
  recurrencyKind?: string;
  stackLevel: number;
  transactionId?: number;
  validFrom?: Timestamp;
  validTo?: Timestamp;
};

export type IdTagInfo = {
  expiryDate?: Timestamp;
  parentIdTag?: string;
  status: AuthorizationStatus;
};

export type LocalAuthorizationList = {
  idTag: string;
  idTagInfo?: IdTagInfo;
};

export type ChargingSchedulePeriod = {
  limit: number;
  numberPhases?: number;
  startPeriod: number;
};

export type ChargingSchedule = {
  chargingRateUnit: string;
  chargingSchedulePeriod: ChargingSchedulePeriod[];
  duration?: number;
  minChargingRate?: number;
  startSchedule?: Timestamp;
};

// ---- CP


export type DiagnosticsStatus = 'Idle' | 'Uploaded' | 'UploadFailed' | 'Uploading';
export type RegistrationStatus = 'Accepted' | 'Rejected' | 'Pending';

export type FirmwareStatus =
  | 'Downloaded'
  | 'DownloadFailed'
  | 'Downloading'
  | 'Idle'
  | 'FirmwareStatusNotification'
  | 'InstallationFailed'
  | 'Installing'
  | 'Installed';

export type SampledValue = {
  context?: string;
  format?: string;
  location?: string;
  measurand?: string;
  phase?: string;
  unit?: string;

  value: string;
};

export type TransactionDataItems = {
  sampledValues: SampledValue[];
  timestamp: Timestamp;
};

export type MeterValue = {
  sampledValue: SampledValue[];
  timestamp: Timestamp; // TODO: maybe string?
};
