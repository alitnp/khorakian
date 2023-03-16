import { FORBIDDEN } from "http-status/lib";

class ForbiddenError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = FORBIDDEN;
    this.message = message || "شما دسترسی به این بخش ندارید.";
    this.data = null;
    this.isSuccess = false;
  }
}

export default ForbiddenError;
