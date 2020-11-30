import { CentralSystem } from './cs';
import { ChargePoint } from './cp';

describe('test cs<->cp communication', () => {
  const PORT = 8080;
  const cs = new CentralSystem(PORT, (req, cpId) => {
    return [{}, undefined]
  });

  const cp = new ChargePoint(
    '123',
    req => [undefined, new Error('123')],
    `ws://localhost:${PORT}`
  );

  let triggerConnected = (cpId: string) => { };
  cs.addConnectionListener((cpId, status) => {
    if (status === 'connected')
      triggerConnected(cpId)
  });
  const waitForConnection = (cpId: string) =>
    new Promise(resolve => {
      triggerConnected = connectedId => {
        if (connectedId == cpId) resolve(cpId);
      };
    });

  it('should connect', async () => {
    cp.connect();
    await waitForConnection('123');
  })

})