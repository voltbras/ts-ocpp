/* tslint:disable:max-line-length no-empty-interface */
export interface ICancelReservationInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    reservationId: number;
}

export interface ICancelReservationOutput {
    /** urn://Ocpp/Cp/2015/10/#CancelReservationStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IChangeAvailabilityInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2015/10/#AvailabilityType(Inoperative,Operative) */
    type: "Inoperative" | "Operative";
}

export interface IChangeAvailabilityOutput {
    /** urn://Ocpp/Cp/2015/10/#AvailabilityStatus(Accepted,Rejected,Scheduled) */
    status: "Accepted" | "Rejected" | "Scheduled";
}

export interface IChangeConfigurationInput {
    /** urn://Ocpp/Cp/2015/10/#CiString50Type(maxLength) */
    key: string;
    /** urn://Ocpp/Cp/2015/10/#CiString500Type(maxLength) */
    value: string;
}

export interface IChangeConfigurationOutput {
    /** urn://Ocpp/Cp/2015/10/#ConfigurationStatus(Accepted,NotSupported,RebootRequired,Rejected) */
    status: "Accepted" | "NotSupported" | "RebootRequired" | "Rejected";
}

export interface IClearCacheInput {}

export interface IClearCacheOutput {
    /** urn://Ocpp/Cp/2015/10/#ClearCacheStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IClearChargingProfileInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    id: number;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2015/10/#ChargingProfilePurposeType(ChargePointMaxProfile,TxDefaultProfile,TxProfile) */
    chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    stackLevel: number;
}

export interface IClearChargingProfileOutput {
    /** urn://Ocpp/Cp/2015/10/#ClearChargingProfileStatus(Accepted,Unknown) */
    status: "Accepted" | "Unknown";
}

export interface IDataTransferInput {
    /** urn://Ocpp/Cp/2015/10/#CiString255Type(maxLength) */
    vendorId: string;
    /** urn://Ocpp/Cp/2015/10/#CiString50Type(maxLength) */
    messageId: string;
    /** urn://Ocpp/Cp/2015/10/#s:string(undefined) */
    data: string;
}

export interface IDataTransferOutput {
    /** urn://Ocpp/Cp/2015/10/#DataTransferStatus(Accepted,Rejected,UnknownMessageId,UnknownVendorId) */
    status: "Accepted" | "Rejected" | "UnknownMessageId" | "UnknownVendorId";
    /** urn://Ocpp/Cp/2015/10/#s:string(undefined) */
    data: string;
}

export interface IGetConfigurationInput {
    /** urn://Ocpp/Cp/2015/10/#CiString50Type(maxLength) */
    key: string;
}

export interface IGetConfigurationOutput {
    configurationKey: ChargePointServiceSoap12Types.IconfigurationKey[];
    /** urn://Ocpp/Cp/2015/10/#CiString50Type(maxLength) */
    unknownKey: string;
}

export interface IGetDiagnosticsInput {
    /** urn://Ocpp/Cp/2015/10/#s:anyURI(undefined) */
    location: string;
    /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
    startTime: string;
    /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
    stopTime: string;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    retries: number;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    retryInterval: number;
}

export interface IGetDiagnosticsOutput {
    /** urn://Ocpp/Cp/2015/10/#CiString255Type(maxLength) */
    fileName: string;
}

export interface IGetLocalListVersionInput {}

export interface IGetLocalListVersionOutput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    listVersion: number;
}

export interface IRemoteStartTransactionInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2015/10/#IdToken(maxLength) */
    idTag: string;
    chargingProfile: ChargePointServiceSoap12Types.IchargingProfile;
}

export interface IRemoteStartTransactionOutput {
    /** urn://Ocpp/Cp/2015/10/#RemoteStartStopStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IRemoteStopTransactionInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    transactionId: number;
}

export interface IRemoteStopTransactionOutput {
    /** urn://Ocpp/Cp/2015/10/#RemoteStartStopStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IGetCompositeScheduleInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    duration: number;
    /** urn://Ocpp/Cp/2015/10/#ChargingRateUnitType(W,A) */
    chargingRateUnit: "W" | "A";
}

export interface IGetCompositeScheduleOutput {
    /** urn://Ocpp/Cp/2015/10/#GetCompositeScheduleStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
    scheduleStart: string;
    chargingSchedule: ChargePointServiceSoap12Types.IchargingSchedule;
}

export interface IReserveNowInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
    expiryDate: string;
    /** urn://Ocpp/Cp/2015/10/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cp/2015/10/#IdToken(maxLength) */
    parentIdTag: string;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    reservationId: number;
}

export interface IReserveNowOutput {
    /** urn://Ocpp/Cp/2015/10/#ReservationStatus(Accepted,Faulted,Occupied,Rejected,Unavailable) */
    status: "Accepted" | "Faulted" | "Occupied" | "Rejected" | "Unavailable";
}

export interface IResetInput {
    /** urn://Ocpp/Cp/2015/10/#ResetType(Hard,Soft) */
    type: "Hard" | "Soft";
}

export interface IResetOutput {
    /** urn://Ocpp/Cp/2015/10/#ResetStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface ISendLocalListInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    listVersion: number;
    localAuthorizationList: ChargePointServiceSoap12Types.IlocalAuthorizationList[];
    /** urn://Ocpp/Cp/2015/10/#UpdateType(Differential,Full) */
    updateType: "Differential" | "Full";
}

export interface ISendLocalListOutput {
    /** urn://Ocpp/Cp/2015/10/#UpdateStatus(Accepted,Failed,NotSupported,VersionMismatch) */
    status: "Accepted" | "Failed" | "NotSupported" | "VersionMismatch";
}

export interface ISetChargingProfileInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
    csChargingProfiles: ChargePointServiceSoap12Types.IcsChargingProfiles;
}

export interface ISetChargingProfileOutput {
    /** urn://Ocpp/Cp/2015/10/#ChargingProfileStatus(Accepted,Rejected,NotSupported) */
    status: "Accepted" | "Rejected" | "NotSupported";
}

export interface ITriggerMessageInput {
    /** urn://Ocpp/Cp/2015/10/#MessageTrigger(BootNotification,DiagnosticsStatusNotification,FirmwareStatusNotification,Heartbeat,MeterValues,StatusNotification) */
    requestedMessage: "BootNotification" | "DiagnosticsStatusNotification" | "FirmwareStatusNotification" | "Heartbeat" | "MeterValues" | "StatusNotification";
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
}

export interface ITriggerMessageOutput {
    /** urn://Ocpp/Cp/2015/10/#TriggerMessageStatus(Accepted,Rejected,NotImplemented) */
    status: "Accepted" | "Rejected" | "NotImplemented";
}

export interface IUnlockConnectorInput {
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    connectorId: number;
}

export interface IUnlockConnectorOutput {
    /** urn://Ocpp/Cp/2015/10/#UnlockStatus(Unlocked,UnlockFailed,NotSupported) */
    status: "Unlocked" | "UnlockFailed" | "NotSupported";
}

export interface IUpdateFirmwareInput {
    /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
    retrieveDate: string;
    /** urn://Ocpp/Cp/2015/10/#s:anyURI(undefined) */
    location: string;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    retries: number;
    /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
    retryInterval: number;
}

export interface IUpdateFirmwareOutput {}

export interface IChargePointServiceSoap12Soap {
    CancelReservation: (input: ICancelReservationInput, cb: (err: any | null, result: ICancelReservationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ChangeAvailability: (input: IChangeAvailabilityInput, cb: (err: any | null, result: IChangeAvailabilityOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ChangeConfiguration: (input: IChangeConfigurationInput, cb: (err: any | null, result: IChangeConfigurationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ClearCache: (input: IClearCacheInput, cb: (err: any | null, result: IClearCacheOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ClearChargingProfile: (input: IClearChargingProfileInput, cb: (err: any | null, result: IClearChargingProfileOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DataTransfer: (input: IDataTransferInput, cb: (err: any | null, result: IDataTransferOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetConfiguration: (input: IGetConfigurationInput, cb: (err: any | null, result: IGetConfigurationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetDiagnostics: (input: IGetDiagnosticsInput, cb: (err: any | null, result: IGetDiagnosticsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetLocalListVersion: (input: IGetLocalListVersionInput, cb: (err: any | null, result: IGetLocalListVersionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    RemoteStartTransaction: (input: IRemoteStartTransactionInput, cb: (err: any | null, result: IRemoteStartTransactionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    RemoteStopTransaction: (input: IRemoteStopTransactionInput, cb: (err: any | null, result: IRemoteStopTransactionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetCompositeSchedule: (input: IGetCompositeScheduleInput, cb: (err: any | null, result: IGetCompositeScheduleOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ReserveNow: (input: IReserveNowInput, cb: (err: any | null, result: IReserveNowOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    Reset: (input: IResetInput, cb: (err: any | null, result: IResetOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    SendLocalList: (input: ISendLocalListInput, cb: (err: any | null, result: ISendLocalListOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    SetChargingProfile: (input: ISetChargingProfileInput, cb: (err: any | null, result: ISetChargingProfileOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    TriggerMessage: (input: ITriggerMessageInput, cb: (err: any | null, result: ITriggerMessageOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    UnlockConnector: (input: IUnlockConnectorInput, cb: (err: any | null, result: IUnlockConnectorOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    UpdateFirmware: (input: IUpdateFirmwareInput, cb: (err: any | null, result: IUpdateFirmwareOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace ChargePointServiceSoap12Types {
    export interface IconfigurationKey {
        /** urn://Ocpp/Cp/2015/10/#CiString50Type(maxLength) */
        key: string;
        /** urn://Ocpp/Cp/2015/10/#s:boolean(undefined) */
        readonly: boolean;
        /** urn://Ocpp/Cp/2015/10/#CiString500Type(maxLength) */
        value: string;
    }
    export interface IchargingSchedulePeriod {
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        startPeriod: number;
        /** urn://Ocpp/Cp/2015/10/#DecimalOne(fractionDigits) */
        limit: "fractionDigits";
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        numberPhases: number;
    }
    export interface IchargingSchedule {
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        duration: number;
        /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
        startSchedule: string;
        /** urn://Ocpp/Cp/2015/10/#ChargingRateUnitType(W,A) */
        chargingRateUnit: "W" | "A";
        chargingSchedulePeriod: ChargePointServiceSoap12Types.IchargingSchedulePeriod[];
        /** urn://Ocpp/Cp/2015/10/#DecimalOne(fractionDigits) */
        minChargingRate: "fractionDigits";
    }
    export interface IchargingProfile {
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        chargingProfileId: number;
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        transactionId: number;
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        stackLevel: number;
        /** urn://Ocpp/Cp/2015/10/#ChargingProfilePurposeType(ChargePointMaxProfile,TxDefaultProfile,TxProfile) */
        chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
        /** urn://Ocpp/Cp/2015/10/#ChargingProfileKindType(Absolute,Recurring,Relative) */
        chargingProfileKind: "Absolute" | "Recurring" | "Relative";
        /** urn://Ocpp/Cp/2015/10/#RecurrencyKindType(Daily,Weekly) */
        recurrencyKind: "Daily" | "Weekly";
        /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
        validFrom: string;
        /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
        validTo: string;
        chargingSchedule: ChargePointServiceSoap12Types.IchargingSchedule;
    }
    export interface IidTagInfo {
        /** urn://Ocpp/Cp/2015/10/#AuthorizationStatus(Accepted,Blocked,Expired,Invalid,ConcurrentTx) */
        status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
        /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
        expiryDate: string;
        /** urn://Ocpp/Cp/2015/10/#IdToken(maxLength) */
        parentIdTag: string;
    }
    export interface IlocalAuthorizationList {
        /** urn://Ocpp/Cp/2015/10/#IdToken(maxLength) */
        idTag: string;
        idTagInfo: ChargePointServiceSoap12Types.IidTagInfo;
    }
    export interface IcsChargingProfiles {
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        chargingProfileId: number;
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        transactionId: number;
        /** urn://Ocpp/Cp/2015/10/#s:int(undefined) */
        stackLevel: number;
        /** urn://Ocpp/Cp/2015/10/#ChargingProfilePurposeType(ChargePointMaxProfile,TxDefaultProfile,TxProfile) */
        chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
        /** urn://Ocpp/Cp/2015/10/#ChargingProfileKindType(Absolute,Recurring,Relative) */
        chargingProfileKind: "Absolute" | "Recurring" | "Relative";
        /** urn://Ocpp/Cp/2015/10/#RecurrencyKindType(Daily,Weekly) */
        recurrencyKind: "Daily" | "Weekly";
        /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
        validFrom: string;
        /** urn://Ocpp/Cp/2015/10/#s:dateTime(undefined) */
        validTo: string;
        chargingSchedule: ChargePointServiceSoap12Types.IchargingSchedule;
    }
}
