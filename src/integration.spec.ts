import CentralSystem from './cs';
import ChargePoint from './cp';
import { ChargePointAction } from './messages/cp';
import { Request } from './messages';
import { CentralSystemAction } from './messages/cs';
import { Right } from 'purify-ts';

describe('test cs<->cp communication', () => {
  const connect = async (cp: ChargePoint, cs: CentralSystem) => {
    let triggerConnected = (_cpId: string) => { };
    cs.addConnectionListener((cpId, status) => {
      if (status === 'connected') triggerConnected(cpId);
    });
    const waitForConnection = (cpId: string) =>
      new Promise((resolve) => {
        triggerConnected = (connectedId) => {
          if (connectedId == cpId) resolve(cpId);
        };
      });

    const waitCentralSystem = waitForConnection(cp.id);
    await cp.connect();
    await waitCentralSystem;
  }


  it('should connect', async () => {
    const PORT = 8080;
    const cs = new CentralSystem(PORT, (_req, _cpId) => {
      throw new Error('cs');
    });

    const cp = new ChargePoint(
      '123',
      () => { throw new Error('123') },
      `ws://localhost:${PORT}`
    );
    await connect(cp, cs);

    cp.close();
    cs.close();
  });

  describe('sending messages', () => {
    const PORT = 8081;
    let waitCsReqTrigger = (_req: Request<ChargePointAction, 'v1.6-json'>) => { }
    const waitCsReq: Promise<Request<ChargePointAction, 'v1.6-json'>> = new Promise(resolve => waitCsReqTrigger = resolve);

    let waitCpReqTrigger = (_req: Request<CentralSystemAction, 'v1.6-json'>) => { }
    const _waitCpReq: Promise<Request<CentralSystemAction, 'v1.6-json'>> = new Promise(resolve => waitCpReqTrigger = resolve);

    const currentTime = new Date().toISOString();
    const cs = new CentralSystem(PORT, (req) => {
      waitCsReqTrigger(req as Request<ChargePointAction, 'v1.6-json'>);
      if (req.action === 'Heartbeat') {
        return { action: 'Heartbeat', ocppVersion: 'v1.6-json', currentTime };
      }
      if (req.action === 'StatusNotification') {
        return { action: 'StatusNotification', ocppVersion: 'v1.6-json' };
      }
      throw new Error('message not supported');
    }, false);

    const cp = new ChargePoint(
      '456',
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
        throw new Error('456');
      },
      `ws://localhost:${PORT}`
    );

    beforeAll(async () => await connect(cp, cs));

    it('normal heartbeat', async () => {
      const csResp = await cp.sendRequest({ ocppVersion: 'v1.6-json', action: 'Heartbeat', payload: {} });

      expect((await waitCsReq).action).toBe('Heartbeat');
      expect(csResp.map(resp => resp.currentTime)).toStrictEqual(Right(currentTime));

      const cpResp = await cs.sendRequest({
        action: 'GetConfiguration',
        chargePointId: '456',
        ocppVersion: 'v1.6-json',
        payload: {},
      });
      expect(cpResp.map(resp => resp.configurationKey?.[0].key)).toStrictEqual(Right('Test'));
    })

    it('rejects invalid message', async () => {
      const csResp = await cp.sendRequest({
        ocppVersion: 'v1.6-json',
        action: 'StatusNotification',
        payload: { connectorId: 0, errorCode: 'NoError', status: 'INVALID' as any }
      });
      expect(csResp.isLeft()).toBeTruthy();
    });

    afterAll(() => cs.close());
  });
});
