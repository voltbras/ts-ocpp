import { MessageType, OCPPJMessage } from './types';
import { parseOCPPMessage, stringifyOCPPMessage } from './format';

describe('ws', () => {
  it('should throw on invalid messages', () => {
    expect(parseOCPPMessage('').isLeft()).toBeTruthy()
    expect(parseOCPPMessage('[]').isLeft()).toBeTruthy()
    expect(parseOCPPMessage('[123]').isLeft()).toBeTruthy()
    expect(parseOCPPMessage('["2"]').isLeft()).toBeTruthy()
    expect(parseOCPPMessage('["2", "123", "BootNotification", {}]').isLeft()).toBeTruthy()
  })

  const messagesFixtures: Array<[string, OCPPJMessage]> = [
    [
      '[2,"123","BootNotification",{}]',
      { type: MessageType.CALL, id: '123', action: 'BootNotification', payload: {} }
    ],
    [
      '[3,"123",{}]',
      { type: MessageType.CALLRESULT, id: '123', payload: {} }
    ],
    [
      '[4,"123","InternalError","err"]',
      { type: MessageType.CALLERROR, id: '123', errorCode: 'InternalError', errorDescription: 'err' }
    ],
    [
      '[4,"123","InternalError","",{"code":123}]',
      { type: MessageType.CALLERROR, id: '123', errorCode: 'InternalError', errorDescription: '', errorDetails: { code: 123 } }
    ],
  ];

  test
    .each(messagesFixtures)(
      'should work on valid messages %s',
      (raw, expected) => {
        const parsed = parseOCPPMessage(raw).unsafeCoerce();
        expect(parsed).toStrictEqual(expected)
        const stringified = stringifyOCPPMessage(parsed);
        expect(stringified).toBe(raw);
      }
    );

  it('date conversion', () => {
    expect(stringifyOCPPMessage({
      type: MessageType.CALLRESULT,
      id: '123',
      payload: {
        currentTime: new Date("2021-04-09T23:01:38.100Z"),
      }
    })).toBe(`[3,\"123\",{\"currentTime\":\"2021-04-09T23:01:38.100Z\"}]`)
  })
})
