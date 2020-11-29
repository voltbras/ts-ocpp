import type { IncomingMessage } from 'http';
import { parseOCPPMessage } from './helpers';
import ActionName from '../../messages/action';
import { ChargePointMessageHandler } from '..';
import ChargePointRequest from '../../messages/cpreq';
import { validateMessage } from '../../messages/cpreq/validation';

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
    payload?: Object;
  }
  | {
    messageType: MessageType.CALLRESULT;
    payload?: Object;
  }
  | {
    messageType: MessageType.CALLERROR;
    errorCode: ErrorCode;
    errorDescription: string;
    errorDetails?: Object;
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
  onMessage: onMessage(request, cpHandler),
});

const onMessage = (request: IncomingMessage, cpHandler: ChargePointMessageHandler): Connection['onMessage'] => rawMessage => {
  const cpId = request.url?.split('/').pop();
  if (!cpId) throw new Error('no chargepoint ID provided');
  const message = parseOCPPMessage(rawMessage);
  switch (message.messageType) {
    case MessageType.CALL: {
      const ocppMessage = validateMessage(message.action, message.payload ?? {});
      if (!ocppMessage) throw new Error('invalid ocpp message');
      cpHandler(ocppMessage, cpId);
    }
  }
};
