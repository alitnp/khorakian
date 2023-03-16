import { UNAUTHORIZED } from "http-status/lib";

class UnauthenticatedError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = UNAUTHORIZED;
    this.message = message || "لطفا ابتدا وارد حساب کاربری خود شوید.";
    this.data = null;
    this.isSuccess = false;
  }
}

export default UnauthenticatedError;
