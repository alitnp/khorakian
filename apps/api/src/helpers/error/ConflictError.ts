import { CONFLICT } from "http-status/lib";

class ConflictError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = CONFLICT;
    this.message = message || "امکان انجام این عملیات وجود ندارد.";
    this.data = null;
    this.isSuccess = false;
  }
}

export default ConflictError;
