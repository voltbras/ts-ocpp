---
title: messages/soap/wsdl/CentralSystemService/CentralSystemServiceSoap12.ts
nav_order: 6
parent: Modules
---

## CentralSystemServiceSoap12 overview

tslint:disable:max-line-length no-empty-interface

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [IAuthorizeInput (interface)](#iauthorizeinput-interface)
  - [IAuthorizeOutput (interface)](#iauthorizeoutput-interface)
  - [IBootNotificationInput (interface)](#ibootnotificationinput-interface)
  - [IBootNotificationOutput (interface)](#ibootnotificationoutput-interface)
  - [ICentralSystemServiceSoap12Soap (interface)](#icentralsystemservicesoap12soap-interface)
  - [IDataTransferInput (interface)](#idatatransferinput-interface)
  - [IDataTransferOutput (interface)](#idatatransferoutput-interface)
  - [IDiagnosticsStatusNotificationInput (interface)](#idiagnosticsstatusnotificationinput-interface)
  - [IDiagnosticsStatusNotificationOutput (interface)](#idiagnosticsstatusnotificationoutput-interface)
  - [IFirmwareStatusNotificationInput (interface)](#ifirmwarestatusnotificationinput-interface)
  - [IFirmwareStatusNotificationOutput (interface)](#ifirmwarestatusnotificationoutput-interface)
  - [IHeartbeatInput (interface)](#iheartbeatinput-interface)
  - [IHeartbeatOutput (interface)](#iheartbeatoutput-interface)
  - [IMeterValuesInput (interface)](#imetervaluesinput-interface)
  - [IMeterValuesOutput (interface)](#imetervaluesoutput-interface)
  - [IStartTransactionInput (interface)](#istarttransactioninput-interface)
  - [IStartTransactionOutput (interface)](#istarttransactionoutput-interface)
  - [IStatusNotificationInput (interface)](#istatusnotificationinput-interface)
  - [IStatusNotificationOutput (interface)](#istatusnotificationoutput-interface)
  - [IStopTransactionInput (interface)](#istoptransactioninput-interface)
  - [IStopTransactionOutput (interface)](#istoptransactionoutput-interface)

---

# utils

## IAuthorizeInput (interface)

**Signature**

```ts
export interface IAuthorizeInput {
  /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
  idTag: string
}
```

## IAuthorizeOutput (interface)

**Signature**

```ts
export interface IAuthorizeOutput {
  idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo
}
```

## IBootNotificationInput (interface)

**Signature**

```ts
export interface IBootNotificationInput {
  /** urn://Ocpp/Cs/2012/06/#ChargePointVendor(maxLength) */
  chargePointVendor: string
  /** urn://Ocpp/Cs/2012/06/#ChargePointModel(maxLength) */
  chargePointModel: string
  /** urn://Ocpp/Cs/2012/06/#ChargePointSerialNumber(maxLength) */
  chargePointSerialNumber: string
  /** urn://Ocpp/Cs/2012/06/#ChargeBoxSerialNumber(maxLength) */
  chargeBoxSerialNumber: string
  /** urn://Ocpp/Cs/2012/06/#FirmwareVersion(maxLength) */
  firmwareVersion: string
  /** urn://Ocpp/Cs/2012/06/#IccidString(maxLength) */
  iccid: string
  /** urn://Ocpp/Cs/2012/06/#ImsiString(maxLength) */
  imsi: string
  /** urn://Ocpp/Cs/2012/06/#MeterType(maxLength) */
  meterType: string
  /** urn://Ocpp/Cs/2012/06/#MeterSerialNumber(maxLength) */
  meterSerialNumber: string
}
```

## IBootNotificationOutput (interface)

**Signature**

```ts
export interface IBootNotificationOutput {
  /** urn://Ocpp/Cs/2012/06/#RegistrationStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
  /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
  currentTime: string
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  heartbeatInterval: number
}
```

## ICentralSystemServiceSoap12Soap (interface)

**Signature**

```ts
export interface ICentralSystemServiceSoap12Soap {
  Authorize: (
    input: IAuthorizeInput,
    cb: (err: any | null, result: IAuthorizeOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  StartTransaction: (
    input: IStartTransactionInput,
    cb: (err: any | null, result: IStartTransactionOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  StopTransaction: (
    input: IStopTransactionInput,
    cb: (err: any | null, result: IStopTransactionOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  Heartbeat: (
    input: IHeartbeatInput,
    cb: (err: any | null, result: IHeartbeatOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  MeterValues: (
    input: IMeterValuesInput,
    cb: (err: any | null, result: IMeterValuesOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  BootNotification: (
    input: IBootNotificationInput,
    cb: (err: any | null, result: IBootNotificationOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  StatusNotification: (
    input: IStatusNotificationInput,
    cb: (err: any | null, result: IStatusNotificationOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  FirmwareStatusNotification: (
    input: IFirmwareStatusNotificationInput,
    cb: (
      err: any | null,
      result: IFirmwareStatusNotificationOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  DiagnosticsStatusNotification: (
    input: IDiagnosticsStatusNotificationInput,
    cb: (
      err: any | null,
      result: IDiagnosticsStatusNotificationOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  DataTransfer: (
    input: IDataTransferInput,
    cb: (err: any | null, result: IDataTransferOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
}
```

## IDataTransferInput (interface)

**Signature**

```ts
export interface IDataTransferInput {
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  vendorId: string
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  messageId: string
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  data: string
}
```

## IDataTransferOutput (interface)

**Signature**

```ts
export interface IDataTransferOutput {
  /** urn://Ocpp/Cs/2012/06/#DataTransferStatus(Accepted,Rejected,UnknownMessageId,UnknownVendorId) */
  status: 'Accepted' | 'Rejected' | 'UnknownMessageId' | 'UnknownVendorId'
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  data: string
}
```

## IDiagnosticsStatusNotificationInput (interface)

**Signature**

```ts
export interface IDiagnosticsStatusNotificationInput {
  /** urn://Ocpp/Cs/2012/06/#DiagnosticsStatus(Uploaded,UploadFailed) */
  status: 'Uploaded' | 'UploadFailed'
}
```

## IDiagnosticsStatusNotificationOutput (interface)

**Signature**

```ts
export interface IDiagnosticsStatusNotificationOutput {}
```

## IFirmwareStatusNotificationInput (interface)

**Signature**

```ts
export interface IFirmwareStatusNotificationInput {
  /** urn://Ocpp/Cs/2012/06/#FirmwareStatus(Downloaded,DownloadFailed,InstallationFailed,Installed) */
  status: 'Downloaded' | 'DownloadFailed' | 'InstallationFailed' | 'Installed'
}
```

## IFirmwareStatusNotificationOutput (interface)

**Signature**

```ts
export interface IFirmwareStatusNotificationOutput {}
```

## IHeartbeatInput (interface)

**Signature**

```ts
export interface IHeartbeatInput {}
```

## IHeartbeatOutput (interface)

**Signature**

```ts
export interface IHeartbeatOutput {
  /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
  currentTime: string
}
```

## IMeterValuesInput (interface)

**Signature**

```ts
export interface IMeterValuesInput {
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  connectorId: number
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  transactionId: number
  values: CentralSystemServiceSoap12Types.Ivalues[]
}
```

## IMeterValuesOutput (interface)

**Signature**

```ts
export interface IMeterValuesOutput {}
```

## IStartTransactionInput (interface)

**Signature**

```ts
export interface IStartTransactionInput {
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  connectorId: number
  /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
  idTag: string
  /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
  timestamp: string
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  meterStart: number
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  reservationId: number
}
```

## IStartTransactionOutput (interface)

**Signature**

```ts
export interface IStartTransactionOutput {
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  transactionId: number
  idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo
}
```

## IStatusNotificationInput (interface)

**Signature**

```ts
export interface IStatusNotificationInput {
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  connectorId: number
  /** urn://Ocpp/Cs/2012/06/#ChargePointStatus(Available,Occupied,Faulted,Unavailable,Reserved) */
  status: 'Available' | 'Occupied' | 'Faulted' | 'Unavailable' | 'Reserved'
  /** urn://Ocpp/Cs/2012/06/#ChargePointErrorCode(ConnectorLockFailure,HighTemperature,Mode3Error,NoError,PowerMeterFailure,PowerSwitchFailure,ReaderFailure,ResetFailure,GroundFailure,OverCurrentFailure,UnderVoltage,WeakSignal,OtherError) */
  errorCode:
    | 'ConnectorLockFailure'
    | 'HighTemperature'
    | 'Mode3Error'
    | 'NoError'
    | 'PowerMeterFailure'
    | 'PowerSwitchFailure'
    | 'ReaderFailure'
    | 'ResetFailure'
    | 'GroundFailure'
    | 'OverCurrentFailure'
    | 'UnderVoltage'
    | 'WeakSignal'
    | 'OtherError'
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  info: string
  /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
  timestamp: string
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  vendorId: string
  /** urn://Ocpp/Cs/2012/06/#s:string(undefined) */
  vendorErrorCode: string
}
```

## IStatusNotificationOutput (interface)

**Signature**

```ts
export interface IStatusNotificationOutput {}
```

## IStopTransactionInput (interface)

**Signature**

```ts
export interface IStopTransactionInput {
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  transactionId: number
  /** urn://Ocpp/Cs/2012/06/#IdToken(maxLength) */
  idTag: string
  /** urn://Ocpp/Cs/2012/06/#s:dateTime(undefined) */
  timestamp: string
  /** urn://Ocpp/Cs/2012/06/#s:int(undefined) */
  meterStop: number
  transactionData: CentralSystemServiceSoap12Types.ItransactionData[]
}
```

## IStopTransactionOutput (interface)

**Signature**

```ts
export interface IStopTransactionOutput {
  idTagInfo: CentralSystemServiceSoap12Types.IidTagInfo
}
```
