import { Fail, Success, Validation } from 'monet';
import { ValidationError } from '../../errors';
import ChargePointRequest from '.';

const actions: ChargePointRequest['action'][] = [
  "Authorize",
  "BootNotification",
  "DataTransfer",
  "DiagnosticsStatusNotification",
  "FirmwareStatusNotification",
  "Heartbeat",
  "MeterValues",
  "StartTransaction",
  "StatusNotification",
  "StopTransaction"
];

const validateAction = (action: string): action is ChargePointRequest['action'] =>
  actions.includes(action as any)

// TODO: proper validation
export const validateMessage = (action: string, body: object): Validation<ValidationError, ChargePointRequest> => {
  if (!validateAction(action)) return Fail(new ValidationError('action is not valid'));

  // @ts-ignore
  return Success({
    action,
    ...body
  });
}
