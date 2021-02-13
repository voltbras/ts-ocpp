import WebSocket from 'ws';
import { ActionName } from '../messages';

export type OCPPJRawMessage = WebSocket.Data;
export type ErrorCode =
  | 'NotImplemented'
  | 'NotSupported'
  | 'InternalError'
  | 'ProtocolError'
  | 'SecurityError'
  | 'FormationViolation'
  | 'PropertyConstraintViolation'
  | 'OccurenceConstraintViolation'
  | 'TypeConstraintViolation'
  | 'GenericError';

export enum MessageType {
  CALL = 2,
  CALLRESULT = 3,
  CALLERROR = 4,
}
export type OCPPJMessage =
  { id: string } & (
    | {
      type: MessageType.CALL;
      action: ActionName;
      payload?: object;
    }
    | {
      type: MessageType.CALLRESULT;
      payload?: object;
    }
    | {
      type: MessageType.CALLERROR;
      errorCode: ErrorCode;
      errorDescription: string;
      errorDetails?: object;
    }
  );
