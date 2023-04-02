import UnauthenticatedError from "@/helpers/error/UnauthorizedError";

const auth = (req: Req, _res: Res, next: NextFn) => {
  const tokenData = !!req.headers.tokenData;
  if (!tokenData) {
    throw new UnauthenticatedError();
  }
  next();
};
export default auth;
