import { ValidationError } from '../errors';
import { ActionName, Request, Response } from '.';
import { Either, Left, Right } from 'purify-ts';
import { validate } from 'jsonschema';

type ReqRes<Action extends ActionName<'v1.6-json'>> = {
  request: Request<Action, 'v1.6-json'>,
  response: Response<Action, 'v1.6-json'>,
};

const validateMessage = <Action extends ActionName<'v1.6-json'>, T extends 'request' | 'response'>
  (type: T, action: string, body: object, acceptedActions: Action[]): Either<ValidationError, ReqRes<Action>[T]> => {
  if (!acceptedActions.includes(action as Action))
    return Left(new ValidationError('action is not valid'));

  const schema = require(`./json/${type}/${action}.json`);
  const result = validate(body, schema);

  if (!result.valid)
    return Left(new ValidationError(`jsonschema errors: ${result.errors.map(err => err.toString())}`))

  return Right({
    action,
    ocppVersion: 'v1.6-json',
    ...body
  } as ReqRes<Action>[T]);
};

export const validateMessageRequest = <T extends ActionName<'v1.6-json'>>(action: string, body: object, acceptedActions: T[]): Either<ValidationError, Request<T, 'v1.6-json'>> =>
  validateMessage('request', action, body, acceptedActions);

export const validateMessageResponse = <T extends ActionName<'v1.6-json'>>(action: string, body: object, acceptedActions: T[]): Either<ValidationError, Response<T, 'v1.6-json'>> =>
  validateMessage('response', action, body, acceptedActions);