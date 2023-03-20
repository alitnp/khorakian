import { INTERNAL_SERVER_ERROR } from "http-status/lib";

class ServerError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = INTERNAL_SERVER_ERROR;
    this.message = message || "خطایی در سرور رخ داده";
    this.data = null;
    this.isSuccess = false;
  }
}

export default ServerError;
