# ts-ocpp

:zap: OCPP (Open Charge Point Protocol) implemented in Typescript.

## install

```bash
yarn add @voltbras/ts-ocpp
# OR
npm install @voltbras/ts-ocpp --save
```

## planned features

- [x] OCPP v1.6 JSON
- [ ] OCPP v1.5 SOAP

## instruction

### central system

defining a central system that accepts OCPP requests:

```typescript
// port and request handler as arguments
const centralSystem = new CentralSystem(3000, (req, chargepointId) => {
  switch (action) {
    case 'Heartbeat':
      // returns a successful response
      return [{ action: 'Heartbeat', currentTime: new Date().toISOString() }, undefined];
  }
  // returns a non-successful response
  return [undefined, new Error('message not supported')];
});
```

sending a request to the chargepoint "123":

```typescript
// Returns a Either(Error or Success) object(functional, will not throw on error)
const response = await centralSystem.sendRequest('123', 'GetConfiguration', {});
// it can be used in a functional way
response.map(({ configurationKey }) => configurationKey[0].key);
// or can be used in the standard JS way(will throw if there was an error)
const unsafeResponse = response.unsafeCoerce();
```

### chargepoint

defining a chargepoint that accepts OCPP requests:

```typescript
// port, request handler and central system URL as arguments
const chargepoint = new ChargePoint(3001, req => {
  switch (action) {
    case 'GetConfiguration':
      // returns a successful response
      return [{ action: 'Heartbeat', configurationKey: [] }, undefined];
  }
  // returns a non-successful response
  return [undefined, new Error('message not supported')];
});
```

sending a request to the central system(see central system's section to understand the return type):
```typescript
const response = await chargepoint.sendRequest('Heartbeat', {});
```
