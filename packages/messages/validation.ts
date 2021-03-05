import { ValidationError } from '../errors';
import { ActionName, Request, Response } from '.';
import { Either, Left, Right } from 'purify-ts';
import { validate } from 'jsonschema';

type ReqRes<Action extends ActionName> = {
  request: Request<Action>,
  response: Response<Action>,
};

const validateMessage = <Action extends ActionName, T extends 'request' | 'response'>
  (type: T, action: string, body: object, acceptedActions: Action[]): Either<ValidationError, ReqRes<Action>[T]> => {
  if (!acceptedActions.includes(action as Action))
    return Left(new ValidationError('action is not valid'));

  const schema = require(`./json/${type}/${action}.json`);
  const result = validate(body, schema);

  if (!result.valid)
    return Left(new ValidationError(`jsonschema errors: ${result.errors.map(err => err.toString())}`))
  // @ts-ignore
  return Right({
    action,
    ...body
  });
};

export const validateMessageRequest = <T extends ActionName>(action: string, body: object, acceptedActions: T[]): Either<ValidationError, Request<T>> =>
  validateMessage('request', action, body, acceptedActions);

export const validateMessageResponse = <T extends ActionName>(action: string, body: object, acceptedActions: T[]): Either<ValidationError, Response<T>> =>
  validateMessage('response', action, body, acceptedActions);