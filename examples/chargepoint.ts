import ChargePoint from '../src/cp';

if (!process.env.STATION_ID || !process.env.CENTRAL_SYSTEM_URL)
  throw new Error('pass STATION_ID and CENTRAL_SYSTEM_URL environment variables');

const cp = new ChargePoint(
  process.env.STATION_ID,
  req => {
    switch (req.action) {
      case 'RemoteStartTransaction':
        return {
          action: req.action,
          ocppVersion: req.ocppVersion,
          status: 'Accepted'
        }
    }
    throw new Error('message not supported');
  },
  process.env.CENTRAL_SYSTEM_URL
);

async function main() {
  console.log('connecting cp...');
  await cp.connect();
  console.log('connected!');
  // setInterval(
  //   () => cp.sendRequest({ action: 'Heartbeat', ocppVersion: 'v1.6-json', payload: {} }).then(console.log),
  //   3 * 1000,
  // )
  await cp.sendRequest({
    action: 'MeterValues', ocppVersion: 'v1.6-json', payload: {
      connectorId: 1,
      meterValue: [{
        //@ts-ignore
        timestamp: new Date().toISOString(),
        sampledValue: [{
          value: "123",
          //measurand: 'Energy.Active.Import.Interval',
        //@ts-ignore
          measurand: 'Banana',
        }]
      }]
    }
  }).run().then(console.log).catch(console.log)
};

main().catch(console.error);
