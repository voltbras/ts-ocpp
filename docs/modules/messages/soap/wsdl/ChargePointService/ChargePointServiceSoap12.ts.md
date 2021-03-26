---
title: messages/soap/wsdl/ChargePointService/ChargePointServiceSoap12.ts
nav_order: 7
parent: Modules
---

## ChargePointServiceSoap12 overview

tslint:disable:max-line-length no-empty-interface

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ICancelReservationInput (interface)](#icancelreservationinput-interface)
  - [ICancelReservationOutput (interface)](#icancelreservationoutput-interface)
  - [IChangeAvailabilityInput (interface)](#ichangeavailabilityinput-interface)
  - [IChangeAvailabilityOutput (interface)](#ichangeavailabilityoutput-interface)
  - [IChangeConfigurationInput (interface)](#ichangeconfigurationinput-interface)
  - [IChangeConfigurationOutput (interface)](#ichangeconfigurationoutput-interface)
  - [IChargePointServiceSoap12Soap (interface)](#ichargepointservicesoap12soap-interface)
  - [IClearCacheInput (interface)](#iclearcacheinput-interface)
  - [IClearCacheOutput (interface)](#iclearcacheoutput-interface)
  - [IDataTransferInput (interface)](#idatatransferinput-interface)
  - [IDataTransferOutput (interface)](#idatatransferoutput-interface)
  - [IGetConfigurationInput (interface)](#igetconfigurationinput-interface)
  - [IGetConfigurationOutput (interface)](#igetconfigurationoutput-interface)
  - [IGetDiagnosticsInput (interface)](#igetdiagnosticsinput-interface)
  - [IGetDiagnosticsOutput (interface)](#igetdiagnosticsoutput-interface)
  - [IGetLocalListVersionInput (interface)](#igetlocallistversioninput-interface)
  - [IGetLocalListVersionOutput (interface)](#igetlocallistversionoutput-interface)
  - [IRemoteStartTransactionInput (interface)](#iremotestarttransactioninput-interface)
  - [IRemoteStartTransactionOutput (interface)](#iremotestarttransactionoutput-interface)
  - [IRemoteStopTransactionInput (interface)](#iremotestoptransactioninput-interface)
  - [IRemoteStopTransactionOutput (interface)](#iremotestoptransactionoutput-interface)
  - [IReserveNowInput (interface)](#ireservenowinput-interface)
  - [IReserveNowOutput (interface)](#ireservenowoutput-interface)
  - [IResetInput (interface)](#iresetinput-interface)
  - [IResetOutput (interface)](#iresetoutput-interface)
  - [ISendLocalListInput (interface)](#isendlocallistinput-interface)
  - [ISendLocalListOutput (interface)](#isendlocallistoutput-interface)
  - [IUnlockConnectorInput (interface)](#iunlockconnectorinput-interface)
  - [IUnlockConnectorOutput (interface)](#iunlockconnectoroutput-interface)
  - [IUpdateFirmwareInput (interface)](#iupdatefirmwareinput-interface)
  - [IUpdateFirmwareOutput (interface)](#iupdatefirmwareoutput-interface)

---

# utils

## ICancelReservationInput (interface)

**Signature**

```ts
export interface ICancelReservationInput {
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  reservationId: number
}
```

## ICancelReservationOutput (interface)

**Signature**

```ts
export interface ICancelReservationOutput {
  /** urn://Ocpp/Cp/2012/06/#CancelReservationStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
}
```

## IChangeAvailabilityInput (interface)

**Signature**

```ts
export interface IChangeAvailabilityInput {
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  connectorId: number
  /** urn://Ocpp/Cp/2012/06/#AvailabilityType(Inoperative,Operative) */
  type: 'Inoperative' | 'Operative'
}
```

## IChangeAvailabilityOutput (interface)

**Signature**

```ts
export interface IChangeAvailabilityOutput {
  /** urn://Ocpp/Cp/2012/06/#AvailabilityStatus(Accepted,Rejected,Scheduled) */
  status: 'Accepted' | 'Rejected' | 'Scheduled'
}
```

## IChangeConfigurationInput (interface)

**Signature**

```ts
export interface IChangeConfigurationInput {
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  key: string
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  value: string
}
```

## IChangeConfigurationOutput (interface)

**Signature**

```ts
export interface IChangeConfigurationOutput {
  /** urn://Ocpp/Cp/2012/06/#ConfigurationStatus(Accepted,Rejected,NotSupported) */
  status: 'Accepted' | 'Rejected' | 'NotSupported'
}
```

## IChargePointServiceSoap12Soap (interface)

**Signature**

```ts
export interface IChargePointServiceSoap12Soap {
  UnlockConnector: (
    input: IUnlockConnectorInput,
    cb: (err: any | null, result: IUnlockConnectorOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  Reset: (
    input: IResetInput,
    cb: (err: any | null, result: IResetOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  ChangeAvailability: (
    input: IChangeAvailabilityInput,
    cb: (err: any | null, result: IChangeAvailabilityOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  GetDiagnostics: (
    input: IGetDiagnosticsInput,
    cb: (err: any | null, result: IGetDiagnosticsOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  ClearCache: (
    input: IClearCacheInput,
    cb: (err: any | null, result: IClearCacheOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  UpdateFirmware: (
    input: IUpdateFirmwareInput,
    cb: (err: any | null, result: IUpdateFirmwareOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  ChangeConfiguration: (
    input: IChangeConfigurationInput,
    cb: (err: any | null, result: IChangeConfigurationOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  RemoteStartTransaction: (
    input: IRemoteStartTransactionInput,
    cb: (err: any | null, result: IRemoteStartTransactionOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  RemoteStopTransaction: (
    input: IRemoteStopTransactionInput,
    cb: (err: any | null, result: IRemoteStopTransactionOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  CancelReservation: (
    input: ICancelReservationInput,
    cb: (err: any | null, result: ICancelReservationOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  DataTransfer: (
    input: IDataTransferInput,
    cb: (err: any | null, result: IDataTransferOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  GetConfiguration: (
    input: IGetConfigurationInput,
    cb: (err: any | null, result: IGetConfigurationOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  GetLocalListVersion: (
    input: IGetLocalListVersionInput,
    cb: (err: any | null, result: IGetLocalListVersionOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  ReserveNow: (
    input: IReserveNowInput,
    cb: (err: any | null, result: IReserveNowOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
  SendLocalList: (
    input: ISendLocalListInput,
    cb: (err: any | null, result: ISendLocalListOutput, raw: string, soapHeader: { [k: string]: any }) => any,
    options?: any,
    extraHeaders?: any
  ) => void
}
```

## IClearCacheInput (interface)

**Signature**

```ts
export interface IClearCacheInput {}
```

## IClearCacheOutput (interface)

**Signature**

```ts
export interface IClearCacheOutput {
  /** urn://Ocpp/Cp/2012/06/#ClearCacheStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
}
```

## IDataTransferInput (interface)

**Signature**

```ts
export interface IDataTransferInput {
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  vendorId: string
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  messageId: string
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  data: string
}
```

## IDataTransferOutput (interface)

**Signature**

```ts
export interface IDataTransferOutput {
  /** urn://Ocpp/Cp/2012/06/#DataTransferStatus(Accepted,Rejected,UnknownMessageId,UnknownVendorId) */
  status: 'Accepted' | 'Rejected' | 'UnknownMessageId' | 'UnknownVendorId'
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  data: string
}
```

## IGetConfigurationInput (interface)

**Signature**

```ts
export interface IGetConfigurationInput {
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  key: string
}
```

## IGetConfigurationOutput (interface)

**Signature**

```ts
export interface IGetConfigurationOutput {
  configurationKey: ChargePointServiceSoap12Types.IconfigurationKey[]
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  unknownKey: string
}
```

## IGetDiagnosticsInput (interface)

**Signature**

```ts
export interface IGetDiagnosticsInput {
  /** urn://Ocpp/Cp/2012/06/#s:anyURI(undefined) */
  location: string
  /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
  startTime: Date
  /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
  stopTime: Date
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  retries: number
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  retryInterval: number
}
```

## IGetDiagnosticsOutput (interface)

**Signature**

```ts
export interface IGetDiagnosticsOutput {
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  fileName: string
}
```

## IGetLocalListVersionInput (interface)

**Signature**

```ts
export interface IGetLocalListVersionInput {}
```

## IGetLocalListVersionOutput (interface)

**Signature**

```ts
export interface IGetLocalListVersionOutput {
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  listVersion: number
}
```

## IRemoteStartTransactionInput (interface)

**Signature**

```ts
export interface IRemoteStartTransactionInput {
  /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
  idTag: string
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  connectorId: number
}
```

## IRemoteStartTransactionOutput (interface)

**Signature**

```ts
export interface IRemoteStartTransactionOutput {
  /** urn://Ocpp/Cp/2012/06/#RemoteStartStopStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
}
```

## IRemoteStopTransactionInput (interface)

**Signature**

```ts
export interface IRemoteStopTransactionInput {
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  transactionId: number
}
```

## IRemoteStopTransactionOutput (interface)

**Signature**

```ts
export interface IRemoteStopTransactionOutput {
  /** urn://Ocpp/Cp/2012/06/#RemoteStartStopStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
}
```

## IReserveNowInput (interface)

**Signature**

```ts
export interface IReserveNowInput {
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  connectorId: number
  /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
  expiryDate: Date
  /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
  idTag: string
  /** urn://Ocpp/Cp/2012/06/#IdToken(maxLength) */
  parentIdTag: string
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  reservationId: number
}
```

## IReserveNowOutput (interface)

**Signature**

```ts
export interface IReserveNowOutput {
  /** urn://Ocpp/Cp/2012/06/#ReservationStatus(Accepted,Faulted,Occupied,Rejected,Unavailable) */
  status: 'Accepted' | 'Faulted' | 'Occupied' | 'Rejected' | 'Unavailable'
}
```

## IResetInput (interface)

**Signature**

```ts
export interface IResetInput {
  /** urn://Ocpp/Cp/2012/06/#ResetType(Hard,Soft) */
  type: 'Hard' | 'Soft'
}
```

## IResetOutput (interface)

**Signature**

```ts
export interface IResetOutput {
  /** urn://Ocpp/Cp/2012/06/#ResetStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
}
```

## ISendLocalListInput (interface)

**Signature**

```ts
export interface ISendLocalListInput {
  /** urn://Ocpp/Cp/2012/06/#UpdateType(Differential,Full) */
  updateType: 'Differential' | 'Full'
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  listVersion: number
  localAuthorisationList: ChargePointServiceSoap12Types.IlocalAuthorisationList[]
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  hash: string
}
```

## ISendLocalListOutput (interface)

**Signature**

```ts
export interface ISendLocalListOutput {
  /** urn://Ocpp/Cp/2012/06/#UpdateStatus(Accepted,Failed,HashError,NotSupported,VersionMismatch) */
  status: 'Accepted' | 'Failed' | 'HashError' | 'NotSupported' | 'VersionMismatch'
  /** urn://Ocpp/Cp/2012/06/#s:string(undefined) */
  hash: string
}
```

## IUnlockConnectorInput (interface)

**Signature**

```ts
export interface IUnlockConnectorInput {
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  connectorId: number
}
```

## IUnlockConnectorOutput (interface)

**Signature**

```ts
export interface IUnlockConnectorOutput {
  /** urn://Ocpp/Cp/2012/06/#UnlockStatus(Accepted,Rejected) */
  status: 'Accepted' | 'Rejected'
}
```

## IUpdateFirmwareInput (interface)

**Signature**

```ts
export interface IUpdateFirmwareInput {
  /** urn://Ocpp/Cp/2012/06/#s:dateTime(undefined) */
  retrieveDate: Date
  /** urn://Ocpp/Cp/2012/06/#s:anyURI(undefined) */
  location: string
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  retries: number
  /** urn://Ocpp/Cp/2012/06/#s:int(undefined) */
  retryInterval: number
}
```

## IUpdateFirmwareOutput (interface)

**Signature**

```ts
export interface IUpdateFirmwareOutput {}
```
