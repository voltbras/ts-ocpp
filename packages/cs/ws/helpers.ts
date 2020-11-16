import { MessageType, OCPPJMessage, OCPPJRawMessage } from './connection';

export const parseOCPPMessage = (message: OCPPJRawMessage): OCPPJMessage => {
  try {
    const [
      messageType,
      messageId,
      commandNameOrPayloadOrErrorCode,
      commandPayloadOrErrorDescription,
      errorDetails,
    ] = JSON.parse(message) as Array<any>;
    switch (messageType as MessageType) {
      case MessageType.CALL: {
        return {
          messageType: MessageType.CALL,
          messageId,
          action: commandNameOrPayloadOrErrorCode,
          payload: commandPayloadOrErrorDescription,
        };
      }
      case MessageType.CALLRESULT: {
        return {
          messageType: MessageType.CALLRESULT,
          messageId,
          payload: commandPayloadOrErrorDescription,
        };
      }
      case MessageType.CALLERROR: {
        return {
          messageType: MessageType.CALLERROR,
          messageId,
          errorDetails,
          errorCode: commandNameOrPayloadOrErrorCode,
          errorDescription: commandPayloadOrErrorDescription,
        };
      }
    }
  } catch (err) {
    throw new Error(
      `An error occurred when trying to parse message: "${message}", ${err.message}`
    );
  }
};
