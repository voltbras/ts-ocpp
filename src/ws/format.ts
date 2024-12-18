import { MessageType, OCPPJMessage, OCPPJRawMessage } from './types';
import { ValidationError } from '../errors';
import { Either, Left, Right } from 'purify-ts';

export const parseOCPPMessage = (raw: OCPPJRawMessage): Either<ValidationError, OCPPJMessage> => {
  try {
    if (typeof raw !== 'string') return Left(new ValidationError('only string is supported'));

    const [
      type,
      id,
      ...rest
    ] = JSON.parse(raw) as Array<any>;
    switch (type as MessageType) {
      case MessageType.CALL: {
        const [action, payload] = rest;
        return Right({
          type: MessageType.CALL,
          id,
          action,
          ...(payload ? { payload } : {})
        });
      }
      case MessageType.CALLRESULT: {
        const [payload] = rest;
        return Right({
          type: MessageType.CALLRESULT,
          id,
          ...(payload ? { payload } : {})
        });
      }
      case MessageType.CALLERROR: {
        const [errorCode, errorDescription, errorDetails] = rest;
        return Right({
          type: MessageType.CALLERROR,
          id,
          errorCode,
          errorDescription,
          ...(errorDetails ? { errorDetails } : {}),
        });
      }
      default: return Left(new ValidationError(`Not supported message type: ${type}`));
    }
  } catch (err) {
    if (err instanceof Error) {
      return Left(new ValidationError(`An error occurred when trying to parse message: "${raw}"`).wrap(err))
    }
    return Left(new ValidationError(`An error occurred when trying to parse message: "${raw}"`))
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
