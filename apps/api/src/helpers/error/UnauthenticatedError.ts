class UnauthenticatedError {
  readonly status: number;
  readonly message: string;
  readonly data: null;
  readonly isSuccess: boolean;

  constructor(message?: string) {
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = 401;
    this.message = message || "لطفا ابتدا وارد حساب کاربری خود شوید.";
    this.data = null;
    this.isSuccess = false;
  }
}

export default UnauthenticatedError;
