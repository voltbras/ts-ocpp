import { ValidationError } from '../errors';
import { ActionName, Request } from '.';
import { Either, Left, Right } from 'purify-ts';

// TODO: proper validation
export const validateMessage = <T extends ActionName>(action: string, body: object, acceptedActions: T[]): Either<ValidationError, Request<T>> => {
  if (!acceptedActions.includes(action as T))
    return Left(new ValidationError('action is not valid'));

  // @ts-ignore
  return Right({
    action,
    ...body
  });
}
