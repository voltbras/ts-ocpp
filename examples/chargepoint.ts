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

  // Send BootNotification — the first message every charge point must send to the central system
  console.log('sending BootNotification...');
  const bootResponse = await cp.sendRequest({
    action: 'BootNotification',
    ocppVersion: 'v1.6-json',
    payload: {
      chargePointVendor: 'Acme',
      chargePointModel: 'ModelX',
      chargePointSerialNumber: 'CP-123456',
      firmwareVersion: '1.2.3',
    },
  });
  console.log('boot response:', bootResponse);

  // Start sending periodic Heartbeats
  setInterval(
    () => cp.sendRequest({ action: 'Heartbeat', ocppVersion: 'v1.6-json', payload: {} }).then(console.log),
    3 * 1000,
  )
};

main().catch(console.error);
