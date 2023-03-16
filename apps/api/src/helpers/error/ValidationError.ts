import { BAD_REQUEST } from "http-status/lib";

class ValidationError extends Error {
  readonly status: number;
  readonly message: string;
  readonly details: Record<string, any>;
  readonly isSuccess: boolean;
  readonly data: null;

  constructor(validationErrors: Record<string, any>, message?: string) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = BAD_REQUEST;
    this.message = message || Object.values(validationErrors)[0];
    this.details = validationErrors;
    this.isSuccess = false;
    this.data = null;

    Error.captureStackTrace(this);
  }
}

export default ValidationError;
