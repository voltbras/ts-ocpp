import CentralSystem from './cs';
import ChargePoint from './cp';
import { ChargePointAction } from './messages/cp';
import { Request } from './messages';
import { CentralSystemAction } from './messages/cs';
import { Right } from 'purify-ts';

describe('test cs<->cp communication', () => {
  const PORT = 8080;

  afterEach(() => {
    cp.close();
    cs.close();
  });

  const connect = async (cp: ChargePoint, cs: CentralSystem) => {
    let triggerConnected = (cpId: string) => { };
    cs.addConnectionListener((cpId, status) => {
      if (status === 'connected') triggerConnected(cpId);
    });
    const waitForConnection = (cpId: string) =>
      new Promise((resolve) => {
        triggerConnected = (connectedId) => {
          if (connectedId == cpId) resolve(cpId);
        };
      });

    const waitCentralSystem = waitForConnection('123');
    await cp.connect();
    await waitCentralSystem;
  }

  const cs = new CentralSystem(PORT, (req, cpId) => {
    throw new Error('cs');
  });

  const cp = new ChargePoint(
    '123',
    () => { throw new Error('123') },
    `ws://localhost:${PORT}`
  );

  it('should connect', async () => {
    await connect(cp, cs);
  });

  it('should send message', async () => {
    let waitCsReqTrigger = (req: Request<ChargePointAction, 'v1.6-json'>) => { }
    const waitCsReq: Promise<Request<ChargePointAction, 'v1.6-json'>> = new Promise(resolve => waitCsReqTrigger = resolve);

    let waitCpReqTrigger = (req: Request<CentralSystemAction, 'v1.6-json'>) => { }
    const waitCpReq: Promise<Request<CentralSystemAction, 'v1.6-json'>> = new Promise(resolve => waitCpReqTrigger = resolve);

    const currentTime = new Date().toISOString();
    const cs = new CentralSystem(PORT, (req, { chargePointId }) => {
      waitCsReqTrigger(req as Request<ChargePointAction, 'v1.6-json'>);
      if (req.action === 'Heartbeat') {
        return { action: 'Heartbeat', ocppVersion: 'v1.6-json', currentTime };
      }
      throw new Error('message not supported');
    });

    const cp = new ChargePoint(
      '123',
      req => {
        waitCpReqTrigger(req as Request<CentralSystemAction, 'v1.6-json'>);
        if (req.action === 'GetConfiguration') return {
          action: 'GetConfiguration',
          ocppVersion: 'v1.6-json',
          configurationKey: [{
            key: 'Test',
            readonly: true,
          }]
        }
        throw new Error('123');
      },
      `ws://localhost:${PORT}`
    );

    await connect(cp, cs);
    const csResp = await cp.sendRequest({ ocppVersion: 'v1.6-json', action: 'Heartbeat', payload: {} });

    expect((await waitCsReq).action).toBe('Heartbeat');
    expect(csResp.map(resp => resp.currentTime)).toStrictEqual(Right(currentTime));

    const cpResp = await cs.sendRequest({
      action: 'GetConfiguration',
      chargePointId: '123',
      ocppVersion: 'v1.6-json',
      payload: {},
    });
    expect(cpResp.map(resp => resp.configurationKey?.[0].key)).toStrictEqual(Right('Test'));

    cs.close();
  });
});
