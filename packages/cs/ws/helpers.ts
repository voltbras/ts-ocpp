import { MessageType, OCPPJMessage, OCPPJRawMessage } from './connection';

export const parseOCPPMessage = (message: OCPPJRawMessage): OCPPJMessage => {
  try {
    const [
      messageType,
      messageId,
      ...rest
    ] = JSON.parse(message) as Array<any>;
    switch (messageType as MessageType) {
      case MessageType.CALL: {
        const [action, payload] = rest;
        return {
          messageType: MessageType.CALL,
          messageId,
          action,
          ...(payload ? { payload } : {})
        };
      }
      case MessageType.CALLRESULT: {
        const [payload] = rest;
        return {
          messageType: MessageType.CALLRESULT,
          messageId,
          ...(payload ? { payload } : {})
        };
      }
      case MessageType.CALLERROR: {
        const [errorCode, errorDescription, errorDetails] = rest;
        return {
          messageType: MessageType.CALLERROR,
          messageId,
          errorCode,
          errorDescription,
          ...(errorDetails ? { errorDetails } : {}),
        };
      }
      default: throw new Error(`Not supported message type: ${messageType}`);
    }
  } catch (err) {
    throw new Error(
      `An error occurred when trying to parse message: "${message}", ${err.message}`
    );
  }
};
