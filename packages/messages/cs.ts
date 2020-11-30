import { Timestamp } from '../types';
import { AvailabilityType, ChargingProfile, ResetType, LocalAuthorizationList, CentralSystemChargingProfile } from './common';

type CentralSystemMessage = {
  CancelReservation: {
    request: {
      action: 'CancelReservation';
      reservationId: number;
    },
    response: {}
  },
  ChangeAvailability: {
    request: {
      action: 'ChangeAvailability';
      connectorId: number;
      type: AvailabilityType;
    },
    response: {}
  },
  ChangeConfiguration: {
    request: {
      action: 'ChangeConfiguration';
      key: string;
      value: string;
    },
    response: {}
  },
  ClearCache: {
    request: {
      action: 'ClearCache';
    },
    response: {}
  },
  ClearChargingProfile: {
    request: {
      action: 'ClearChargingProfile';
      chargingProfilePurpose?: string;
      connectorId?: number;
      id?: number;
      stackLevel?: number;
    },
    response: {}
  },
  DataTransfer: {
    request: {
      action: 'DataTransfer';
      data?: string;
      messageId?: string;
      vendorId: string;
    },
    response: {}
  },
  GetCompositeSchedule: {
    request: {
      action: 'GetCompositeSchedule';
      chargingRateUnit?: string;
      connectorId: number;
      duration: number;
    },
    response: {}
  },
  GetConfiguration: {
    request: {
      action: 'GetConfiguration';
      key: string[];
    },
    response: {}
  },
  GetDiagnostics: {
    request: {
      action: 'GetDiagnostics';
      location: string;
      retries: number;
      retryInterval: number;
      startTime: Timestamp;
      stopTime: Timestamp;
    },
    response: {}
  },
  GetLocalListVersion: {
    request: {
      action: 'GetLocalListVersion';
    },
    response: {}
  },
  RemoteStartTransaction: {
    request: {
      action: 'RemoteStartTransaction';
      idTag: string;
      chargingProfile?: ChargingProfile;
      connectorId?: number;
    },
    response: {}
  },
  RemoteStopTransaction: {
    request: {
      action: 'RemoteStopTransaction';
      transactionId: number;
    },
    response: {}
  },
  ReserveNow: {
    request: {
      action: 'ReserveNow';
      connectorId: number;
      expiryDate: Timestamp;
      idTag: string;
      parentIdTag?: string;
      reservationId: number;
    },
    response: {}
  },
  Reset: {
    request: {
      action: 'Reset';
      type: ResetType;
    },
    response: {}
  },
  SendLocalList: {
    request: {
      action: 'SendLocalList';
      listVersion: number;
      localAuthorizationList?: LocalAuthorizationList[];
      updateType: string;
    },
    response: {}
  },
  TriggerMessage: {
    request: {
      action: 'TriggerMessage';
      connectorId?: number;
      requestedMessage: string;
    },
    response: {}
  },
  UnlockConnector: {
    request: {
      action: 'UnlockConnector';
      connectorId: number
    },
    response: {}
  },
  UpdateFirmware: {
    request: {
      action: 'UpdateFirmware';
      location: string;
      retries?: number;
      retrieveDate: Timestamp;
      retryInterval?: number;
    },
    response: {}
  },
  SetChargingProfile: {
    request: {
      action: 'SetChargingProfile';
      connectorId: number;
      csChargingProfiles: CentralSystemChargingProfile;
    },
    response: {}
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
