import WebSocket from 'ws';
import { parseOCPPMessage, stringifyOCPPMessage } from './format';
import { MessageType, OCPPJMessage } from './types';
import { ActionName, Request, RequestHandler, Response } from '../messages';
import { OCPPApplicationError, OCPPRequestError, ValidationError } from '../errors/index';
import { validateMessageRequest, validateMessageResponse } from '../messages/validation';
import * as uuid from 'uuid';
import { EitherAsync, Left, Right, Just, Nothing, Maybe, MaybeAsync } from 'purify-ts';


export default class Connection<ReqAction extends ActionName<'v1.6-json'>> {
  private messageTriggers: Record<string, (m: OCPPJMessage) => void> = {};
  constructor(
    private readonly socket: WebSocket,
    private readonly requestHandler: RequestHandler<ReqAction, undefined, 'v1.6-json'>,
    private readonly requestedActions: ReqAction[],
    private readonly respondedActions: ActionName<'v1.6-json'>[],
  ) { }

  public sendRequest<T extends ActionName<'v1.6-json'>>(action: T, { action: _, ocppVersion: __, ...payload }: Request<T, 'v1.6-json'>): EitherAsync<OCPPRequestError, Response<T, 'v1.6-json'>> {
    return EitherAsync.fromPromise(async () => {
      const id = uuid.v4();
      const waitResponse: Promise<OCPPJMessage> = new Promise(resolve => {
        this.messageTriggers[id] = resolve;
      });
      const validateResult = validateMessageRequest(action, payload, this.respondedActions);
      if (validateResult.isLeft())
        return Left(new OCPPApplicationError(validateResult.extract().toString()))

      await this.sendOCPPMessage({
        id,
        type: MessageType.CALL,
        action,
        payload,
      })
      const message = await waitResponse;

      if (message.type === MessageType.CALL) return Left(
        new OCPPRequestError('response received was of CALL type, should be either CALLRESULT or CALLERROR')
      );
      if (message.type === MessageType.CALLERROR) return Left(
        new OCPPRequestError('other side responded with error', message.errorCode, message.errorDescription, message.errorDetails)
      );

      return Right(message.payload as Response<T, 'v1.6-json'>);
    })
  }

  public handleWebsocketData(data: WebSocket.Data) {
    parseOCPPMessage(data)
      .map(msg => this.handleOCPPMessage(msg))
      .map(async result => {
        await result.map(response => this.sendOCPPMessage(response))
      }
      )
  }

  private async sendOCPPMessage(message: OCPPJMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.send(stringifyOCPPMessage(message), err => {
        err ? reject(err) : resolve()
      })
    })
  }

  public close() {
    this.socket.close();
  }

  private handleOCPPMessage(message: OCPPJMessage): MaybeAsync<OCPPJMessage> {
    return MaybeAsync.fromPromise(async () => {
      switch (message.type) {
        case MessageType.CALL:
          const response =
            await EitherAsync.liftEither(validateMessageRequest(message.action, message.payload ?? {}, this.requestedActions))
              .chain(async request => {
                try {
                  const response = await this.requestHandler(request, undefined);
                  return Right(response);
                } catch (error) {
                  return Left(new OCPPApplicationError('on handling chargepoint request').wrap(error));
                }
              });

          const formattedResponse =
            response
              // merge both failure and success to a OCPP-J message
              .either<OCPPJMessage>(fail => ({
                id: message.id,
                type: MessageType.CALLERROR,
                errorCode: 'GenericError',
                errorDescription: `[${fail.name}] ${fail.message}`,
                errorDetails: fail,
              }),
                // remove action and ocpp version from payload
                ({ action, ocppVersion, ...payload }) => ({
                  type: MessageType.CALLRESULT,
                  id: message.id,
                  payload,
                }));
          return Just(formattedResponse);
        case MessageType.CALLERROR:
        case MessageType.CALLRESULT:
          this.messageTriggers[message.id](message);
      }
      return Nothing;
    })
  }
}