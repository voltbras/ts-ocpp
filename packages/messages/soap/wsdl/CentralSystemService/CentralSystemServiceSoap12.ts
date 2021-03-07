/* tslint:disable:max-line-length no-empty-interface */
export interface IAuthorizeInput {
    /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
    idTag: string;
}

export interface IAuthorizeOutput {
    idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo;
}

export interface IStartTransactionInput {
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
    timestamp: string;
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    meterStart: number;
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    reservationId: number;
}

export interface IStartTransactionOutput {
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    transactionId: number;
    idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo;
}

export interface IStopTransactionInput {
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    transactionId: number;
    /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
    timestamp: string;
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    meterStop: number;
    transactionData: CentralSystemServiceSoap12Types.ItransactionData[];
}

export interface IStopTransactionOutput {
    idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo;
}

export interface IHeartbeatInput { }

export interface IHeartbeatOutput {
    /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
    currentTime: string;
}

export interface IMeterValuesInput {
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    transactionId: number;
    values: CentralSystemServiceSoap12Types.Ivalues[];
}

export interface IMeterValuesOutput { }

export interface IBootNotificationInput {
    /** urn://Ocpp/Cs/2012/06/#ChargePointVendor(maxLength) */
    chargePointVendor: string;
    /** urn://Ocpp/Cs/2012/06/#ChargePointModel(maxLength) */
    chargePointModel: string;
    /** urn://Ocpp/Cs/2012/06/#ChargePointSerialNumber(maxLength) */
    chargePointSerialNumber: string;
    /** urn://Ocpp/Cs/2012/06/#ChargeBoxSerialNumber(maxLength) */
    chargeBoxSerialNumber: string;
    /** urn://Ocpp/Cs/2012/06/#FirmwareVersion(maxLength) */
    firmwareVersion: string;
    /** urn://Ocpp/Cs/2012/06/#IccidString(maxLength) */
    iccid: string;
    /** urn://Ocpp/Cs/2012/06/#ImsiString(maxLength) */
    imsi: string;
    /** urn://Ocpp/Cs/2012/06/#MeterType(maxLength) */
    meterType: string;
    /** urn://Ocpp/Cs/2012/06/#MeterSerialNumber(maxLength) */
    meterSerialNumber: string;
}

export interface IBootNotificationOutput {
    /** urn://Ocpp/Cs/2012/06/#RegistrationStatus(Accepted,Rejected) */
    status: "Accepted" | "Rejected";
    /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
    currentTime: string;
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    heartbeatInterval: number;
}

export interface IStatusNotificationInput {
    /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cs/2012/06/#ChargePointStatus(Available,Occupied,Faulted,Unavailable,Reserved) */
    status: "Available" | "Occupied" | "Faulted" | "Unavailable" | "Reserved";
    /** urn://Ocpp/Cs/2012/06/#ChargePointErrorCode(ConnectorLockFailure,HighTemperature,Mode3Error,NoError,PowerMeterFailure,PowerSwitchFailure,ReaderFailure,ResetFailure,GroundFailure,OverCurrentFailure,UnderVoltage,WeakSignal,OtherError) */
    errorCode: "ConnectorLockFailure" | "HighTemperature" | "Mode3Error" | "NoError" | "PowerMeterFailure" | "PowerSwitchFailure" | "ReaderFailure" | "ResetFailure" | "GroundFailure" | "OverCurrentFailure" | "UnderVoltage" | "WeakSignal" | "OtherError";
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    info: string;
    /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
    timestamp: string;
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    vendorId: string;
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    vendorErrorCode: string;
}

export interface IStatusNotificationOutput { }

export interface IFirmwareStatusNotificationInput {
    /** urn://Ocpp/Cs/2012/06/#FirmwareStatus(Downloaded,DownloadFailed,InstallationFailed,Installed) */
    status: "Downloaded" | "DownloadFailed" | "InstallationFailed" | "Installed";
}

export interface IFirmwareStatusNotificationOutput { }

export interface IDiagnosticsStatusNotificationInput {
    /** urn://Ocpp/Cs/2012/06/#DiagnosticsStatus(Uploaded,UploadFailed) */
    status: "Uploaded" | "UploadFailed";
}

export interface IDiagnosticsStatusNotificationOutput { }

export interface IDataTransferInput {
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    vendorId: string;
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    messageId: string;
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    data: string;
}

export interface IDataTransferOutput {
    /** urn://Ocpp/Cs/2012/06/#DataTransferStatus(Accepted,Rejected,UnknownMessageId,UnknownVendorId) */
    status: "Accepted" | "Rejected" | "UnknownMessageId" | "UnknownVendorId";
    /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
    data: string;
}

export interface ICentralSystemServiceSoap12Soap {
    Authorize: (input: IAuthorizeInput, cb: (err: any | null, result: IAuthorizeOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    StartTransaction: (input: IStartTransactionInput, cb: (err: any | null, result: IStartTransactionOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    StopTransaction: (input: IStopTransactionInput, cb: (err: any | null, result: IStopTransactionOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    Heartbeat: (input: IHeartbeatInput, cb: (err: any | null, result: IHeartbeatOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    MeterValues: (input: IMeterValuesInput, cb: (err: any | null, result: IMeterValuesOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    BootNotification: (input: IBootNotificationInput, cb: (err: any | null, result: IBootNotificationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    StatusNotification: (input: IStatusNotificationInput, cb: (err: any | null, result: IStatusNotificationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FirmwareStatusNotification: (input: IFirmwareStatusNotificationInput, cb: (err: any | null, result: IFirmwareStatusNotificationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DiagnosticsStatusNotification: (input: IDiagnosticsStatusNotificationInput, cb: (err: any | null, result: IDiagnosticsStatusNotificationOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DataTransfer: (input: IDataTransferInput, cb: (err: any | null, result: IDataTransferOutput, raw: string, soapHeader: { [k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace CentralSystemServiceSoap12Types {
    export interface IidTagInfo {
        /** urn://Ocpp/Cs/2012/06/#AuthorizationStatus(Accepted,Blocked,Expired,Invalid,ConcurrentTx) */
        status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
        /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
        expiryDate: string;
        /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
        parentIdTag: string;
    }
    export interface Ivalues {
        /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
        timestamp: string;
        /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
        value: string;
    }
    export interface ItransactionData {
        values: CentralSystemServiceSoap12Types.Ivalues[];
    }
}
