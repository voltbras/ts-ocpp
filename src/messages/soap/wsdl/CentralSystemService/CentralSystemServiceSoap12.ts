/* tslint:disable:max-line-length no-empty-interface */
export interface IAuthorizeInput {
    /** urn://Ocpp/Cs/2015/10/#IdToken(maxLength) */
    idTag: string;
}

export interface IAuthorizeOutput {
    idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo;
}

export interface IBootNotificationInput {
    /** urn://Ocpp/Cs/2015/10/#CiString20Type(maxLength) */
    chargePointVendor: string;
    /** urn://Ocpp/Cs/2015/10/#CiString20Type(maxLength) */
    chargePointModel: string;
    /** urn://Ocpp/Cs/2015/10/#CiString25Type(maxLength) */
    chargePointSerialNumber: string;
    /** urn://Ocpp/Cs/2015/10/#CiString25Type(maxLength) */
    chargeBoxSerialNumber: string;
    /** urn://Ocpp/Cs/2015/10/#CiString50Type(maxLength) */
    firmwareVersion: string;
    /** urn://Ocpp/Cs/2015/10/#CiString20Type(maxLength) */
    iccid: string;
    /** urn://Ocpp/Cs/2015/10/#CiString20Type(maxLength) */
    imsi: string;
    /** urn://Ocpp/Cs/2015/10/#CiString25Type(maxLength) */
    meterType: string;
    /** urn://Ocpp/Cs/2015/10/#CiString25Type(maxLength) */
    meterSerialNumber: string;
}

export interface IBootNotificationOutput {
    /** urn://Ocpp/Cs/2015/10/#RegistrationStatus(Accepted,Pending,Rejected) */
    status: "Accepted" | "Pending" | "Rejected";
    /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
    currentTime: string;
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    interval: number;
}

export interface IDataTransferInput {
    /** urn://Ocpp/Cs/2015/10/#CiString255Type(maxLength) */
    vendorId: string;
    /** urn://Ocpp/Cs/2015/10/#CiString50Type(maxLength) */
    messageId: string;
    /** urn://Ocpp/Cs/2015/10/#s:string(undefined) */
    data: string;
}

export interface IDataTransferOutput {
    /** urn://Ocpp/Cs/2015/10/#DataTransferStatus(Accepted,Rejected,UnknownMessageId,UnknownVendorId) */
    status: "Accepted" | "Rejected" | "UnknownMessageId" | "UnknownVendorId";
    /** urn://Ocpp/Cs/2015/10/#s:string(undefined) */
    data: string;
}

export interface IDiagnosticsStatusNotificationInput {
    /** urn://Ocpp/Cs/2015/10/#DiagnosticsStatus(Idle,Uploaded,UploadFailed,Uploading) */
    status: "Idle" | "Uploaded" | "UploadFailed" | "Uploading";
}

export interface IDiagnosticsStatusNotificationOutput {}

export interface IFirmwareStatusNotificationInput {
    /** urn://Ocpp/Cs/2015/10/#FirmwareStatus(Downloaded,DownloadFailed,Downloading,Idle,InstallationFailed,Installed,Installing) */
    status: "Downloaded" | "DownloadFailed" | "Downloading" | "Idle" | "InstallationFailed" | "Installed" | "Installing";
}

export interface IFirmwareStatusNotificationOutput {}

export interface IHeartbeatInput {}

export interface IHeartbeatOutput {
    /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
    currentTime: string;
}

export interface IMeterValuesInput {
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    transactionId: number;
    meterValue: CentralSystemServiceSoap12Types.ImeterValue[];
}

export interface IMeterValuesOutput {}

export interface IStartTransactionInput {
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cs/2015/10/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
    timestamp: string;
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    meterStart: number;
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    reservationId: number;
}

export interface IStartTransactionOutput {
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    transactionId: number;
    idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo;
}

export interface IStatusNotificationInput {
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    connectorId: number;
    /** urn://Ocpp/Cs/2015/10/#ChargePointStatus(Available,Preparing,Charging,SuspendedEV,SuspendedEVSE,Finishing,Reserved,Faulted,Unavailable) */
    status: "Available" | "Preparing" | "Charging" | "SuspendedEV" | "SuspendedEVSE" | "Finishing" | "Reserved" | "Faulted" | "Unavailable";
    /** urn://Ocpp/Cs/2015/10/#ChargePointErrorCode(ConnectorLockFailure,EVCommunicationError,GroundFailure,HighTemperature,InternalError,LocalListConflict,NoError,OtherError,OverCurrentFailure,OverVoltage,PowerMeterFailure,PowerSwitchFailure,ReaderFailure,ResetFailure,UnderVoltage,WeakSignal) */
    errorCode: "ConnectorLockFailure" | "EVCommunicationError" | "GroundFailure" | "HighTemperature" | "InternalError" | "LocalListConflict" | "NoError" | "OtherError" | "OverCurrentFailure" | "OverVoltage" | "PowerMeterFailure" | "PowerSwitchFailure" | "ReaderFailure" | "ResetFailure" | "UnderVoltage" | "WeakSignal";
    /** urn://Ocpp/Cs/2015/10/#CiString50Type(maxLength) */
    info: string;
    /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
    timestamp: string;
    /** urn://Ocpp/Cs/2015/10/#CiString255Type(maxLength) */
    vendorId: string;
    /** urn://Ocpp/Cs/2015/10/#CiString50Type(maxLength) */
    vendorErrorCode: string;
}

export interface IStatusNotificationOutput {}

export interface IStopTransactionInput {
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    transactionId: number;
    /** urn://Ocpp/Cs/2015/10/#IdToken(maxLength) */
    idTag: string;
    /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
    timestamp: string;
    /** urn://Ocpp/Cs/2015/10/#s:int(undefined) */
    meterStop: number;
    /** urn://Ocpp/Cs/2015/10/#Reason(EmergencyStop,EVDisconnected,HardReset,Local,Other,PowerLoss,Reboot,Remote,SoftReset,UnlockCommand,DeAuthorized) */
    reason: "EmergencyStop" | "EVDisconnected" | "HardReset" | "Local" | "Other" | "PowerLoss" | "Reboot" | "Remote" | "SoftReset" | "UnlockCommand" | "DeAuthorized";
    transactionData: CentralSystemServiceSoap12Types.ItransactionData[];
}

export interface IStopTransactionOutput {
    idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo;
}

export interface ICentralSystemServiceSoap12Soap {
    Authorize: (input: IAuthorizeInput, cb: (err: any | null, result: IAuthorizeOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    BootNotification: (input: IBootNotificationInput, cb: (err: any | null, result: IBootNotificationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DataTransfer: (input: IDataTransferInput, cb: (err: any | null, result: IDataTransferOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DiagnosticsStatusNotification: (input: IDiagnosticsStatusNotificationInput, cb: (err: any | null, result: IDiagnosticsStatusNotificationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FirmwareStatusNotification: (input: IFirmwareStatusNotificationInput, cb: (err: any | null, result: IFirmwareStatusNotificationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    Heartbeat: (input: IHeartbeatInput, cb: (err: any | null, result: IHeartbeatOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    MeterValues: (input: IMeterValuesInput, cb: (err: any | null, result: IMeterValuesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    StartTransaction: (input: IStartTransactionInput, cb: (err: any | null, result: IStartTransactionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    StatusNotification: (input: IStatusNotificationInput, cb: (err: any | null, result: IStatusNotificationOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    StopTransaction: (input: IStopTransactionInput, cb: (err: any | null, result: IStopTransactionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace CentralSystemServiceSoap12Types {
    export interface IidTagInfo {
        /** urn://Ocpp/Cs/2015/10/#AuthorizationStatus(Accepted,Blocked,Expired,Invalid,ConcurrentTx) */
        status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
        /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
        expiryDate: string;
        /** urn://Ocpp/Cs/2015/10/#IdToken(maxLength) */
        parentIdTag: string;
    }
    export interface IsampledValue {
        /** urn://Ocpp/Cs/2015/10/#s:string(undefined) */
        value: string;
        /** urn://Ocpp/Cs/2015/10/#ReadingContext(Interruption.Begin,Interruption.End,Other,Sample.Clock,Sample.Periodic,Transaction.Begin,Transaction.End,Trigger) */
        context: "Interruption.Begin" | "Interruption.End" | "Other" | "Sample.Clock" | "Sample.Periodic" | "Transaction.Begin" | "Transaction.End" | "Trigger";
        /** urn://Ocpp/Cs/2015/10/#ValueFormat(Raw,SignedData) */
        format: "Raw" | "SignedData";
        /** urn://Ocpp/Cs/2015/10/#Measurand(Current.Export,Current.Import,Current.Offered,Energy.Active.Export.Register,Energy.Active.Import.Register,Energy.Reactive.Export.Register,Energy.Reactive.Import.Register,Energy.Active.Export.Interval,Energy.Active.Import.Interval,Energy.Reactive.Export.Interval,Energy.Reactive.Import.Interval,Frequency,Power.Active.Export,Power.Active.Import,Power.Factor,Power.Offered,Power.Reactive.Export,Power.Reactive.Import,RPM,SoC,Temperature,Voltage) */
        measurand: "Current.Export" | "Current.Import" | "Current.Offered" | "Energy.Active.Export.Register" | "Energy.Active.Import.Register" | "Energy.Reactive.Export.Register" | "Energy.Reactive.Import.Register" | "Energy.Active.Export.Interval" | "Energy.Active.Import.Interval" | "Energy.Reactive.Export.Interval" | "Energy.Reactive.Import.Interval" | "Frequency" | "Power.Active.Export" | "Power.Active.Import" | "Power.Factor" | "Power.Offered" | "Power.Reactive.Export" | "Power.Reactive.Import" | "RPM" | "SoC" | "Temperature" | "Voltage";
        /** urn://Ocpp/Cs/2015/10/#Phase(L1,L2,L3,N,L1-N,L2-N,L3-N,L1-L2,L2-L3,L3-L1) */
        phase: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
        /** urn://Ocpp/Cs/2015/10/#Location(Body,Cable,EV,Inlet,Outlet) */
        location: "Body" | "Cable" | "EV" | "Inlet" | "Outlet";
        /** urn://Ocpp/Cs/2015/10/#UnitOfMeasure(Celsius,Fahrenheit,Wh,kWh,varh,kvarh,W,kW,VA,kVA,var,kvar,A,V,K,Percent) */
        unit: "Celsius" | "Fahrenheit" | "Wh" | "kWh" | "varh" | "kvarh" | "W" | "kW" | "VA" | "kVA" | "var" | "kvar" | "A" | "V" | "K" | "Percent";
    }
    export interface ImeterValue {
        /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
        timestamp: string;
        sampledValue: CentralSystemServiceSoap12Types.IsampledValue[];
    }
    export interface ItransactionData {
        /** urn://Ocpp/Cs/2015/10/#s:dateTime(undefined) */
        timestamp: string;
        sampledValue: CentralSystemServiceSoap12Types.IsampledValue[];
    }
}
