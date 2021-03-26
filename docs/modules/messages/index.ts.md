---
title: messages/index.ts
nav_order: 3
parent: Modules
---

## index overview

---

<h2 class="text-delta">Table of contents</h2>

- [Handler](#handler)
  - [RequestHandler (type alias)](#requesthandler-type-alias)
- [Message Type](#message-type)
  - [Request (type alias)](#request-type-alias)
  - [Response (type alias)](#response-type-alias)
- [utils](#utils)
  - [ActionName (type alias)](#actionname-type-alias)

---

# Handler

## RequestHandler (type alias)

TS is still not very good with dependent-typing
(i.e. making the return type differ on the input type)
so when using this it is advisable to do type assertions.

**Signature**

```ts
export type RequestHandler<T extends ActionName<V>, Metadata = undefined, V extends OCPPVersion = OCPPVersion> = (
  request: Request<T, V>,
  extra: Metadata
) => Result<Response<T, V>>
```

# Message Type

## Request (type alias)

**Signature**

```ts
export type Request<T extends ActionName<V>, V extends OCPPVersion = OCPPVersion> = ReqRes<T, V>['request']
```

**Example**

```ts
import { Request } from '@voltbras/ts-ocpp'

type ChargeRelatedRequest = Request<'StartTransaction' | 'StopTransaction'>
```

## Response (type alias)

**Signature**

```ts
export type Response<T extends ActionName<V>, V extends OCPPVersion = OCPPVersion> = ReqRes<T, V>['response']
```

**Example**

```ts
import { Response } from '@voltbras/ts-ocpp'

type ChargeRelatedResponse = Response<'StartTransaction' | 'StopTransaction'>
```

# utils

## ActionName (type alias)

**Signature**

```ts
export type ActionName<V extends OCPPVersion = OCPPVersion> = ChargePointAction<V> | CentralSystemAction<V>
```
