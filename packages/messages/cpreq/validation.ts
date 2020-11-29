import ActionName from '../action';
import ChargePointRequest from './index.d';

// TODO: proper validation
export const validateMessage = (action: ActionName, body: object): ChargePointRequest | undefined => {
  return {
    body
  };
}
