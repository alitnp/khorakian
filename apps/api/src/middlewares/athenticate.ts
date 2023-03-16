import jwt from "jsonwebtoken";
import CONFIG from "@/config";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";

const auth = (req: Req, _res: Res, next: NextFn) => {
  const token = req.header("authorization");
  if (!token) {
    throw new UnauthenticatedError();
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      CONFIG.AUTH.ACCESS_TOKEN_SALT as string,
    );
    req.headers.tokenData = JSON.stringify(decoded);
    next();
  } catch (ex) {
    throw new UnauthenticatedError();
  }
};
export default auth;
