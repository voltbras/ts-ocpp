/* tslint:disable:max-line-length no-empty-interface */
export interface IUnlockConnectorInput {
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    connectorId: number;
}

export interface IUnlockConnectorOutput {
    /** urn://Ocpp/Cp/2012/06/#UnlockStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IResetInput {
    /** urn://Ocpp/Cp/2012/06/#ResetType(Hard,Soft) */
    type: "Hard" | "Soft";
}

export interface IResetOutput {
    /** urn://Ocpp/Cp/2012/06/#ResetStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IChangeAvailabilityInput {
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2012/06/#AvailabilityType(Inoperative,Operative) */
    type: "Inoperative" | "Operative";
}

export interface IChangeAvailabilityOutput {
    /** urn://Ocpp/Cp/2012/06/#AvailabilityStatus(Accepted,Rejected,Scheduled) */
    status: "Accepted" | "Rejected" | "Scheduled";
}

export interface IGetDiagnosticsInput {
    /** urn://Ocpp/Cp/2012/06/#s:anyURI(undefined) */
    location: string;
    /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
    startTime: Date;
    /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
    stopTime: Date;
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    retries: number;
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    retryInterval: number;
}

export interface IGetDiagnosticsOutput {
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    fileName: string;
}

export interface IClearCacheInput { }

export interface IClearCacheOutput {
    /** urn://Ocpp/Cp/2012/06/#ClearCacheStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IUpdateFirmwareInput {
    /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
    retrieveDate: Date;
    /** urn://Ocpp/Cp/2012/06/#s:anyURI(undefined) */
    location: string;
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    retries: number;
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    retryInterval: number;
}

export interface IUpdateFirmwareOutput { }

export interface IChangeConfigurationInput {
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    key: string;
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    value: string;
}

export interface IChangeConfigurationOutput {
    /** urn://Ocpp/Cp/2012/06/#ConfigurationStatus(Accepted,Rejected,NotSupported) */
    status: "Accepted" | "Rejected" | "NotSupported";
}

export interface IRemoteStartTransactionInput {
    /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    connectorId: number;
}

export interface IRemoteStartTransactionOutput {
    /** urn://Ocpp/Cp/2012/06/#RemoteStartStopStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IRemoteStopTransactionInput {
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    transactionId: number;
}

export interface IRemoteStopTransactionOutput {
    /** urn://Ocpp/Cp/2012/06/#RemoteStartStopStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface ICancelReservationInput {
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    reservationId: number;
}

export interface ICancelReservationOutput {
    /** urn://Ocpp/Cp/2012/06/#CancelReservationStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
}

export interface IDataTransferInput {
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    vendorId: string;
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    messageId: string;
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    data: string;
}

export interface IDataTransferOutput {
    /** urn://Ocpp/Cp/2012/06/#DataTransferStatus(Accepted,Rejected,UnknownMessageId,UnknownVendorId) */
    status: "Accepted" | "Rejected" | "UnknownMessageId" | "UnknownVendorId";
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    data: string;
}

export interface IGetConfigurationInput {
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    key: string;
}

export interface IGetConfigurationOutput {
    configurationKey: ChargePointServiceSoap12Types.IconfigurationKey[];
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    unknownKey: string;
}

export interface IGetLocalListVersionInput { }

export interface IGetLocalListVersionOutput {
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    listVersion: number;
}

export interface IReserveNowInput {
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
    expiryDate: Date;
    /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
    parentIdTag: string;
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    reservationId: number;
}

export interface IReserveNowOutput {
    /** urn://Ocpp/Cp/2012/06/#ReservationStatus(Accepted,Faulted,Occupied,Rejected,Unavailable) */
    status: "Accepted" | "Faulted" | "Occupied" | "Rejected" | "Unavailable";
}

export interface ISendLocalListInput {
    /** urn://Ocpp/Cp/2012/06/#UpdateType(Differential,Full) */
    updateType: "Differential" | "Full";
    /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
    listVersion: number;
    localAuthorisationList: ChargePointServiceSoap12Types.IlocalAuthorisationList[];
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    hash: string;
}

export interface ISendLocalListOutput {
    /** urn://Ocpp/Cp/2012/06/#UpdateStatus(Accepted,Failed,HashError,NotSupported,VersionMismatch) */
    status: "Accepted" | "Failed" | "HashError" | "NotSupported" | "VersionMismatch";
    /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
    hash: string;
}

export interface IChargePointServiceSoap12Soap {
    UnlockConnector: (input: IUnlockConnectorInput, cb: (err: any | null, result: IUnlockConnectorOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    Reset: (input: IResetInput, cb: (err: any | null, result: IResetOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ChangeAvailability: (input: IChangeAvailabilityInput, cb: (err: any | null, result: IChangeAvailabilityOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetDiagnostics: (input: IGetDiagnosticsInput, cb: (err: any | null, result: IGetDiagnosticsOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ClearCache: (input: IClearCacheInput, cb: (err: any | null, result: IClearCacheOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    UpdateFirmware: (input: IUpdateFirmwareInput, cb: (err: any | null, result: IUpdateFirmwareOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ChangeConfiguration: (input: IChangeConfigurationInput, cb: (err: any | null, result: IChangeConfigurationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    RemoteStartTransaction: (input: IRemoteStartTransactionInput, cb: (err: any | null, result: IRemoteStartTransactionOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    RemoteStopTransaction: (input: IRemoteStopTransactionInput, cb: (err: any | null, result: IRemoteStopTransactionOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    CancelReservation: (input: ICancelReservationInput, cb: (err: any | null, result: ICancelReservationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DataTransfer: (input: IDataTransferInput, cb: (err: any | null, result: IDataTransferOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetConfiguration: (input: IGetConfigurationInput, cb: (err: any | null, result: IGetConfigurationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetLocalListVersion: (input: IGetLocalListVersionInput, cb: (err: any | null, result: IGetLocalListVersionOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ReserveNow: (input: IReserveNowInput, cb: (err: any | null, result: IReserveNowOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    SendLocalList: (input: ISendLocalListInput, cb: (err: any | null, result: ISendLocalListOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace ChargePointServiceSoap12Types {
    export interface IconfigurationKey {
        /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
        key: string;
        /** urn://Ocpp/Cp/2012/06/#s:boolean(undefined) */
        readonly: boolean;
        /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
        value: string;
    }
    export interface IidTagInfo {
        /** urn://Ocpp/Cp/2012/06/#AuthorizationStatus(Accepted,Blocked,Expired,Invalid,ConcurrentTx) */
        status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
        /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
        expiryDate: Date;
        /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
        parentIdTag: string;
    }
    export interface IlocalAuthorisationList {
        /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
        idTag: string;
        idTagInfo: ChargePointServiceSoap12Types.IidTagInfo;
    }
}
