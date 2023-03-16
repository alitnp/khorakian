import { BAD_REQUEST } from "http-status/lib";

class BadRequestError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = BAD_REQUEST;
    this.message = message;
    this.data = null;
    this.isSuccess = false;
  }
}

export default BadRequestError;
