import WebSocket from 'ws';
import { parseOCPPMessage, stringifyOCPPMessage } from './format';
import { MessageType, OCPPJMessage } from './types';
import { Fail, Maybe, None, Success, Some, Validation } from 'monet';
import { ActionName, Request, RequestHandler, Response } from '../messages';
import { OCPPApplicationError, OCPPRequestError } from '../errors/index';
import { validateMessage } from '../messages/validation';
import * as uuid from 'uuid';

export default class Connection<T extends ActionName> {
  private messageTriggers: Record<string, (m: OCPPJMessage) => void> = {};
  constructor(
    private readonly socket: WebSocket,
    private readonly requestHandler: RequestHandler<T>,
    private readonly acceptedActions: T[],
  ) { }

  public async sendRequest<T extends ActionName>(action: T, payload: Request<T>): Promise<Validation<OCPPRequestError, Response<T>>> {
    const id = uuid.v4();
    const waitResponse: Promise<OCPPJMessage> = new Promise(resolve => {
      this.messageTriggers[id] = resolve;
    });
    await this.sendOCPPMessage({
      id,
      type: MessageType.CALL,
      action,
      payload,
    })
    const message = await waitResponse;

    if (message.type === MessageType.CALL) return Fail(
      new OCPPRequestError('response received was of CALL type, should be either CALLRESULT or CALLERROR')
    );
    if (message.type === MessageType.CALLERROR) return Fail(
      new OCPPRequestError('other side responded with error', message.errorCode, message.errorDescription, message.errorDetails)
    );
    
    return Success(message.payload as Response<T>)
  }

  public handleWebsocketData(data: WebSocket.Data) {
    parseOCPPMessage(data)
      .map(msg => this.handleOCPPMessage(msg))
      .forEach(result =>
        result.forEach(response => this.sendOCPPMessage(response))
      )
  }

  private async sendOCPPMessage(message: OCPPJMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.send(stringifyOCPPMessage(message), err => {
        err ? reject(err) : resolve()
      })
    })
  }

  private handleOCPPMessage(message: OCPPJMessage): Maybe<OCPPJMessage> {
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
        return Some(response);
      case MessageType.CALLERROR:
      case MessageType.CALLRESULT:
        this.messageTriggers[message.id](message);
    }
    return None();
  }

  public close() {
    this.socket.close();
  }
}