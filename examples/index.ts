import CentralSystem from '../src/cs';

// @ts-ignore
const cs = new CentralSystem(8080, (req, metadata) => {
  console.log('new request', req)
  const { ocppVersion } = req;
  switch (req.action) {
    case 'Heartbeat':
      return { action: req.action, ocppVersion, currentTime: new Date() };
    case 'StatusNotification':
      return { action: req.action, ocppVersion };
    case 'MeterValues':
      if (req.ocppVersion === 'v1.5-soap') {
        const val = req.values[0].value[0];
        if (typeof val === 'string') {
          val;
        } else {
          val.$value;
        }
        console.log('req met', req.values[0].value[0])
      } else {
        const val = req.meterValue[0];
        console.log('req met', val)
        console.log('req met', val.timestamp.getTime)
      }
      break;
    case 'StopTransaction':
      console.log('FSADASDASD', req.ocppVersion === 'v1.5-soap')
      console.log('req time', req.timestamp)
      console.log('req time', req.timestamp.getTime)
      if (req.ocppVersion === 'v1.5-soap') {
        console.log('req stop', req.transactionData[0].values[0])
      }
  }
  throw new Error('not supported');
}, true);

console.log('started');
// setTimeout(async () => {
//   console.log('sending request')
//   const response = await cs.sendRequest({
//     ocppVersion: 'v1.6-json',
//     action: 'RemoteStartTransaction',
//     chargePointId: '123',
//     // chargePointUrl: 'http://localhost:12800',
//     payload: {
//       connectorId: 2,
//       idTag: '123',
//     }
//   });
//   console.log({ response })
// }, 3000);