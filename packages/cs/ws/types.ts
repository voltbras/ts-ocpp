import ActionName from '../../messages/action';
import WebSocket from 'ws';

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
      payload?: Object;
    }
    | {
      type: MessageType.CALLRESULT;
      payload?: Object;
    }
    | {
      type: MessageType.CALLERROR;
      errorCode: ErrorCode;
      errorDescription: string;
      errorDetails?: Object;
    }
  );
