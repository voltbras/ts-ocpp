export class GenericError extends Error {
  wrap(error: Error): this {
    return {
      ...this,
      message: `${this.message}: ${error.message}`
    }
  }
}

export class ValidationError extends GenericError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class OCPPApplicationError extends GenericError {
  constructor(message: string) {
    super(message);
    this.name = "OCPPApplicationError";
  }
}
