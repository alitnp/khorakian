import { UNAUTHORIZED } from "http-status/lib";

class UnauthorizedError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = UNAUTHORIZED;
    this.message = message || "شما دسترسی به این عملیات را ندارید.";
    this.data = null;
    this.isSuccess = false;
  }
}

export default UnauthorizedError;
