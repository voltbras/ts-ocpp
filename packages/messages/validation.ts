import { Fail, Success, Validation } from 'monet';
import { ValidationError } from '../errors';
import { ActionName, Request } from '.';

// TODO: proper validation
export const validateMessage = <T extends ActionName>(action: string, body: object, acceptedActions: T[]): Validation<ValidationError, Request<T>> => {
  if (!acceptedActions.includes(action as T))
    return Fail(new ValidationError('action is not valid'));

  // @ts-ignore
  return Success({
    action,
    ...body
  });
}
