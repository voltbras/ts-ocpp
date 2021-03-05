import { CentralSystem } from './cs';
import { ChargePoint } from './cp';
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
    return [undefined, new Error('cs')];
  });

  const cp = new ChargePoint(
    '123',
    () => [undefined, new Error('123')],
    `ws://localhost:${PORT}`
  );

  it('should connect', async () => {
    await connect(cp, cs);
  });

  it('should send message', async () => {
    let waitCsReqTrigger = (req: Request<ChargePointAction>) => { }
    const waitCsReq: Promise<Request<ChargePointAction>> = new Promise(resolve => waitCsReqTrigger = resolve);

    let waitCpReqTrigger = (req: Request<CentralSystemAction>) => { }
    const waitCpReq: Promise<Request<CentralSystemAction>> = new Promise(resolve => waitCpReqTrigger = resolve);

    const currentTime = new Date();
    const cs = new CentralSystem(PORT, (req, cpId) => {
      waitCsReqTrigger(req);
      if (req.action === 'Heartbeat') {
        return [{ action: 'Heartbeat', currentTime }, undefined];
      }
      return [undefined, new Error('message not supported')];
    });

    const cp = new ChargePoint(
      '123',
      req => {
        waitCpReqTrigger(req);
        if (req.action === 'GetConfiguration') return [{
          action: 'GetConfiguration',
          configurationKey: [{
            key: 'Test',
            readonly: true,
          }]

        }, undefined]
        return [undefined, new Error('123')]
      },
      `ws://localhost:${PORT}`
    );

    await connect(cp, cs);
    const csResp = await cp.sendRequest('Heartbeat', {});

    expect((await waitCsReq).action).toBe('Heartbeat');
    expect(csResp.map(resp => resp.currentTime)).toStrictEqual(Right(currentTime.toISOString()));

    const cpResp = await cs.sendRequest('123', 'GetConfiguration', {});
    expect(cpResp.map(resp => resp.configurationKey?.[0].key)).toStrictEqual(Right('Test'));

    cs.close();
  });
});
