import { ErrorCode } from "../ws";

export class GenericError extends Error {
  wrap(error: Error): this {
    return {
      ...this,
      message: `${this.message}: ${error.message}`
    }
  }
}

export class ValidationError extends GenericError {
  name = "ValidationError";
}

export class OCPPApplicationError extends GenericError {
  name = "OCPPApplicationError";
}

export class OCPPRequestError extends GenericError {
  name = "OCPPRequestError";
  constructor(
    readonly message: string,
    readonly errorCode?: ErrorCode,
    readonly errorDescription?: string,
    readonly errorDetails?: object
  ) {
    super();
  }
}
