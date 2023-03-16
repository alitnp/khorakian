import { NOT_FOUND } from "http-status/lib";

class NotFoundError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = NOT_FOUND;
    this.message = message || "یافت نشد.";
    this.data = null;
    this.isSuccess = false;
  }
}

export default NotFoundError;
