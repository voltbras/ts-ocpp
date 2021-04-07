import CentralSystem from '../src/cs';

const cs = new CentralSystem(8080, (req, metadata) => {
  console.log('new request', metadata)
  const { ocppVersion } = req;
  switch (req.action) {
    case 'Heartbeat':
      return { action: req.action, ocppVersion, currentTime: new Date().toISOString() };
    case 'StatusNotification':
      return { action: req.action, ocppVersion };
  }
  throw new Error('not supported');
});

setTimeout(async () => {
  console.log('sending request')
  const response = await cs.sendRequest({
    ocppVersion: 'v1.6-json',
    action: 'RemoteStartTransaction',
    chargePointId: '123',
    // chargePointUrl: 'http://localhost:12800',
    payload: {
      connectorId: 2,
      idTag: '123',
    }
  });
  console.log({ response })
}, 3000);