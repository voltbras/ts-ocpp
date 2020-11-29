import { MessageType, OCPPJMessage } from './connection';
import { parseOCPPMessage } from './helpers';

describe('ws', () => {
  it('should throw on invalid messages', () => {
    expect(() => parseOCPPMessage('')).toThrow()
    expect(() => parseOCPPMessage('[]')).toThrow()
    expect(() => parseOCPPMessage('[123]')).toThrow()
    expect(() => parseOCPPMessage('["2"]')).toThrow()
    expect(() => parseOCPPMessage('["2", "123", "BootNotification", {}]')).toThrow()
  })

  const messagesFixtures: Array<[string, OCPPJMessage]> = [
    [
      '[2, "123", "BootNotification", {}]',
      { messageType: MessageType.CALL, messageId: '123', action: 'BootNotification', payload: {} }
    ],
    [
      '[3, "123", {}]',
      { messageType: MessageType.CALLRESULT, messageId: '123', payload: {} }
    ],
    [
      '[4, "123", "InternalError", "err"]',
      { messageType: MessageType.CALLERROR, messageId: '123', errorCode: 'InternalError', errorDescription: 'err' }
    ],
    [
      '[4, "123", "InternalError", "", {"code": 123}]',
      { messageType: MessageType.CALLERROR, messageId: '123', errorCode: 'InternalError', errorDescription: '', errorDetails: { code: 123 } }
    ],
  ];

  test
    .each(messagesFixtures)
    (
      'should work on valid messages',
      (raw, expected) =>
        expect(parseOCPPMessage(raw)).toStrictEqual(expected)
    );
})
