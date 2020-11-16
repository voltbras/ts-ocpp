import { Timestamp } from '../types';

type AvailabilityType = 'Inoperative' | 'Operative';

type AuthorizationStatus =
  | 'Accepted'
  | 'Blocked'
  | 'Expired'
  | 'Invalid'
  | 'ConcurrentTx';

type ResetType = 'Hard' | 'Soft';

type ChargingSchedulePeriod = {
  limit: number;
  numberPhases?: number;
  startPeriod: number;
};

type ChargingSchedule = {
  chargingRateUnit: string;
  chargingSchedulePeriod: ChargingSchedulePeriod[];
  duration?: number;
  minChargingRate?: number;
  startSchedule?: Timestamp;
};

type CancelReservation = {
  reservationId: number;
};

type ChangeAvailability = {
  connectorId: number;
  type: AvailabilityType;
};

type ChangeConfiguration = {
  key: string;
  value: string;
};

type ChargingProfile = {
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

type ClearCache = {};

type ClearChargingProfile = {
  chargingProfilePurpose?: string;
  connectorId?: number;
  id?: number;
  stackLevel?: number;
};

type DataTransfer = {
  data?: string;
  messageId?: string;
  vendorId: string;
};

type GetCompositeSchedule = {
  chargingRateUnit?: string;
  connectorId: number;
  duration: number;
};

type GetConfiguration = {
  key: string[];
};

type GetDiagnostics = {
  location: string;
  retries: number;
  retryInterval: number;
  startTime: Timestamp;
  stopTime: Timestamp;
};

type GetLocalListVersion = {};

type IdTagInfo = {
  expiryDate?: Timestamp;
  parentIdTag?: string;
  status: AuthorizationStatus;
};

type LocalAuthorizationList = {
  idTag: string;
  idTagInfo?: IdTagInfo;
};

type RemoteStartTransaction = {
  idTag: string;
  chargingProfile?: ChargingProfile;
  connectorId?: number;
};

type RemoteStopTransaction = {
  transactionId: number;
};

type ReserveNow = {
  connectorId: number;
  expiryDate: Timestamp;
  idTag: string;
  parentIdTag?: string;
  reservationId: number;
};

type Reset = {
  type: ResetType;
};

type SendLocalList = {
  listVersion: number;
  localAuthorizationList?: LocalAuthorizationList[];
  updateType: string;
};

type TriggerMessage = {
  connectorId?: number;
  requestedMessage: string;
};

type UnlockConnector = {
  connectorId: number;
};

type UpdateFirmware = {
  location: string;
  retries?: number;
  retrieveDate: Timestamp;
  retryInterval?: number;
};

type CentralSystemChargingProfile = {
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

type SetChargingProfile = {
  connectorId: number;
  csChargingProfiles: CentralSystemChargingProfile;
};

type CentralSystemRequest =
  | CancelReservation
  | ChangeAvailability
  | ChangeConfiguration
  | ClearCache
  | ClearChargingProfile
  | DataTransfer
  | GetCompositeSchedule
  | GetConfiguration
  | GetDiagnostics
  | GetLocalListVersion
  | RemoteStartTransaction
  | RemoteStopTransaction
  | ReserveNow
  | Reset
  | SendLocalList
  | SetChargingProfile
  | TriggerMessage
  | UnlockConnector
  | UpdateFirmware;

export default CentralSystemRequest;
