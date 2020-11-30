import { MessageType, OCPPJMessage, OCPPJRawMessage } from './types';
import { Validation, Fail, Success } from 'monet';
import { ValidationError } from '../errors';

export const parseOCPPMessage = (raw: OCPPJRawMessage): Validation<ValidationError, OCPPJMessage> => {
  try {
    if (typeof raw !== 'string') return Fail(new ValidationError('only string is supported'));

    const [
      type,
      id,
      ...rest
    ] = JSON.parse(raw) as Array<any>;
    switch (type as MessageType) {
      case MessageType.CALL: {
        const [action, payload] = rest;
        return Success({
          type: MessageType.CALL,
          id,
          action,
          ...(payload ? { payload } : {})
        });
      }
      case MessageType.CALLRESULT: {
        const [payload] = rest;
        return Success({
          type: MessageType.CALLRESULT,
          id,
          ...(payload ? { payload } : {})
        });
      }
      case MessageType.CALLERROR: {
        const [errorCode, errorDescription, errorDetails] = rest;
        return Success({
          type: MessageType.CALLERROR,
          id,
          errorCode,
          errorDescription,
          ...(errorDetails ? { errorDetails } : {}),
        });
      }
      default: return Fail(new ValidationError(`Not supported message type: ${type}`));
    }
  } catch (err) {
    return Fail(new ValidationError(`An error occurred when trying to parse message: "${raw}"`).wrap(err))
  }
};


export const stringifyOCPPMessage = (message: OCPPJMessage): string => {
  switch (message.type) {
    case MessageType.CALL: {
      const { type, id, action, payload } = message;
      return JSON.stringify([type, id, action, ...(payload ? [payload] : [])]);
    }
    case MessageType.CALLRESULT: {
      const { type, id, payload } = message;
      return JSON.stringify([type, id, ...(payload ? [payload] : [])]);
    }
    case MessageType.CALLERROR: {
      const { type, id, errorCode, errorDescription, errorDetails } = message;
      return JSON.stringify([type, id, errorCode, errorDescription, ...(errorDetails ? [errorDetails] : [])]);
    }
  }
};
