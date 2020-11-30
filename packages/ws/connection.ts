import WebSocket from 'ws';
import { parseOCPPMessage, stringifyOCPPMessage } from './format';
import { MessageType, OCPPJMessage } from './types';
import { Fail, Maybe, None, Success, Some } from 'monet';
import { ActionName, RequestHandler, Response } from '../messages';
import { OCPPApplicationError } from '../errors/index';
import { validateMessage } from '../messages/validation';

export default class Connection<T extends ActionName> {
  constructor(
    private readonly socket: WebSocket,
    private readonly requestHandler: RequestHandler<T>,
    private readonly acceptedActions: T[],
  ) { }

  public handleWebsocketData(data: WebSocket.Data) {
    parseOCPPMessage(data)
      .map(msg => this.handleOCPPMessage(msg))
      .forEach(result =>
        result.forEach(response => {
          this.socket.send(response)
        })
      )
  }

  private handleOCPPMessage(message: OCPPJMessage): Maybe<string> {
    switch (message.type) {
      case MessageType.CALL:
        const response =
          validateMessage(message.action, message.payload ?? {}, this.acceptedActions)
            .flatMap<Response<T>>(request => {
              const [response, error] = this.requestHandler(request);
              if (error) return Fail(new OCPPApplicationError('on handling chargepoint request').wrap(error));
              return Success(response!);
            })
            // merge both failure and success to a OCPP-J message
            .fold<OCPPJMessage>(fail => ({
              id: message.id,
              type: MessageType.CALLERROR,
              errorCode: 'GenericError',
              errorDescription: `[${fail.name}] ${fail.message}`,
              errorDetails: fail,
            }), success => ({
              type: MessageType.CALLRESULT,
              id: message.id,
              payload: success,
            }));
        return Some(stringifyOCPPMessage(response));
    }
    return None();
  }
}