---
title: cp/index.ts
nav_order: 1
parent: Modules
---

## index overview

---

<h2 class="text-delta">Table of contents</h2>

- [Charge Point](#charge-point)
  - [ChargePoint (class)](#chargepoint-class)
    - [connect (method)](#connect-method)
    - [sendRequest (method)](#sendrequest-method)
    - [close (method)](#close-method)
- [utils](#utils)
  - [CPSendRequestArgs (type alias)](#cpsendrequestargs-type-alias)

---

# Charge Point

## ChargePoint (class)

Represents a connection to the central system

**Signature**

```ts
export declare class ChargePoint {
  constructor(
    readonly id: string,
    private readonly requestHandler: RequestHandler<
      CentralSystemAction<'v1.6-json'>,
      ValidationError | undefined,
      'v1.6-json'
    >,
    private readonly csUrl: string
  )
}
```

**Example**

```ts
import { ChargePoint } from '@voltbras/ts-ocpp';

const chargePointId = '123';
const centralSystemUrl = 'ws://central-system.com/ocpp';
const chargePoint = new ChargePoint(
 chargePointId,
 // request handler
 req => {
   if (req.action === 'RemoteStartTransaction')
     return {
       action: req.action,
       ocppVersion: req.ocppVersion,
       status: 'Accepted'
     };
   throw new Error('no handler defined')
 }),
 centralSystemUrl
);
```

### connect (method)

**Signature**

```ts
async connect(): Promise<void>
```

### sendRequest (method)

**Signature**

```ts
sendRequest<T extends ChargePointAction>(args: CPSendRequestArgs<T, 'v1.6-json'>): EitherAsync<OCPPRequestError, Response<T>>
```

**Example**

```ts
import { ChargePoint } from '@voltbras/ts-ocpp'

async function communicate(chargePoint: ChargePoint) {
  const response = await chargePoint.sendRequest({ action: 'Heartbeat', ocppVersion: 'v1.6-json', payload: {} })
  // it can be used in a functional way
  response.map((payload) => payload.currentTime)
  // or can be used in the standard JS way(will throw if there was an error)
  const unsafeResponse = response.unsafeCoerce()
}
```

### close (method)

**Signature**

```ts
close()
```

# utils

## CPSendRequestArgs (type alias)

**Signature**

```ts
export type CPSendRequestArgs<T extends ChargePointAction<V>, V extends OCPPVersion> = {
  ocppVersion: 'v1.6-json'
  payload: Omit<Request<T, V>, 'action' | 'ocppVersion'>
  action: T
}
```
