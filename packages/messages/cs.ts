import { Timestamp } from '../types';
import { AvailabilityType, ChargingProfile, ResetType, LocalAuthorizationList, CentralSystemChargingProfile, KeyValue } from './common';

type CentralSystemMessage = {
  CancelReservation: {
    request: {
      action: 'CancelReservation';
      reservationId: number;
    },
    response: {
      action: 'CancelReservation';
    }
  },
  ChangeAvailability: {
    request: {
      action: 'ChangeAvailability';
      connectorId: number;
      type: AvailabilityType;
    },
    response: {
      action: 'ChangeAvailability';
    }
  },
  ChangeConfiguration: {
    request: {
      action: 'ChangeConfiguration';
      key: string;
      value: string;
    },
    response: {
      action: 'ChangeConfiguration';
    }
  },
  ClearCache: {
    request: {
      action: 'ClearCache';
    },
    response: {
      action: 'ClearCache';
    }
  },
  ClearChargingProfile: {
    request: {
      action: 'ClearChargingProfile';
      chargingProfilePurpose?: string;
      connectorId?: number;
      id?: number;
      stackLevel?: number;
    },
    response: {
      action: 'ClearChargingProfile';
    }
  },
  DataTransfer: {
    request: {
      action: 'DataTransfer';
      data?: string;
      messageId?: string;
      vendorId: string;
    },
    response: {
      action: 'DataTransfer';
    }
  },
  GetCompositeSchedule: {
    request: {
      action: 'GetCompositeSchedule';
      chargingRateUnit?: string;
      connectorId: number;
      duration: number;
    },
    response: {
      action: 'GetCompositeSchedule';
    }
  },
  GetConfiguration: {
    request: {
      action: 'GetConfiguration';
      key?: string[];
    },
    response: {
      action: 'GetConfiguration';
      configurationKey?: KeyValue[],
      unknownKey?: string[]
    }
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
    response: {
      action: 'GetDiagnostics';
    }
  },
  GetLocalListVersion: {
    request: {
      action: 'GetLocalListVersion';
    },
    response: {
      action: 'GetLocalListVersion';
    }
  },
  RemoteStartTransaction: {
    request: {
      action: 'RemoteStartTransaction';
      idTag: string;
      chargingProfile?: ChargingProfile;
      connectorId?: number;
    },
    response: {
      action: 'RemoteStartTransaction';
    }
  },
  RemoteStopTransaction: {
    request: {
      action: 'RemoteStopTransaction';
      transactionId: number;
    },
    response: {
      action: 'RemoteStopTransaction';
    }
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
    response: {
      action: 'ReserveNow';
    }
  },
  Reset: {
    request: {
      action: 'Reset';
      type: ResetType;
    },
    response: {
      action: 'Reset';
    }
  },
  SendLocalList: {
    request: {
      action: 'SendLocalList';
      listVersion: number;
      localAuthorizationList?: LocalAuthorizationList[];
      updateType: string;
    },
    response: {
      action: 'SendLocalList';
    }
  },
  TriggerMessage: {
    request: {
      action: 'TriggerMessage';
      connectorId?: number;
      requestedMessage: string;
    },
    response: {
      action: 'TriggerMessage';
    }
  },
  UnlockConnector: {
    request: {
      action: 'UnlockConnector';
      connectorId: number
    },
    response: {
      action: 'UnlockConnector';
    }
  },
  UpdateFirmware: {
    request: {
      action: 'UpdateFirmware';
      location: string;
      retries?: number;
      retrieveDate: Timestamp;
      retryInterval?: number;
    },
    response: {
      action: 'UpdateFirmware';
    }
  },
  SetChargingProfile: {
    request: {
      action: 'SetChargingProfile';
      connectorId: number;
      csChargingProfiles: CentralSystemChargingProfile;
    },
    response: {
      action: 'SetChargingProfile';
    }
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
