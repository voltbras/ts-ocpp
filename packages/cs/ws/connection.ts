import type { IncomingMessage } from 'http';
import { parseOCPPMessage } from './helpers';
import ActionName from '../../messages/action';
import { ChargePointMessageHandler } from '..';
import ChargePointRequest from '../../messages/cpreq';

export type OCPPJRawMessage = string;
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
export type OCPPJMessage = { messageId: string } & (
  | {
      messageType: MessageType.CALL;
      action: ActionName;
      payload: Object;
    }
  | {
      messageType: MessageType.CALLRESULT;
      payload: Object;
    }
  | {
      messageType: MessageType.CALLERROR;
      errorCode: ErrorCode;
      errorDescription: string;
      errorDetails: Object;
    }
);

export type Connection = {
  onMessage: (
    rawMessage: OCPPJRawMessage,
    cpHandler: ChargePointMessageHandler
  ) => any;
};

export type WebSocketConnectionHandlerFactory = (
  request: IncomingMessage,
  cpHandler: ChargePointMessageHandler
) => Connection;

export const createConnection: WebSocketConnectionHandlerFactory = (
  request,
  cpHandler
) => ({
  onMessage,
});

const onMessage: Connection['onMessage'] = (rawMessage, cpHandler) => {
  const message = parseOCPPMessage(rawMessage);
  switch (message.messageType) {
    case MessageType.CALL: {
      cpHandler(message.payload);
    }
  }
};
