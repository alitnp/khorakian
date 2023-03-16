import jwt from "jsonwebtoken";
import CONFIG from "@/config";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import { ForbiddenError } from "@/helpers/error";

const isAdmin = (req: Req, _res: Res, next: NextFn) => {
  const token = req.header("authorization");
  let decoded: any;
  if (!token) {
    throw new UnauthenticatedError();
  }

  try {
    decoded = jwt.verify(
      token.replace("Bearer ", ""),
      CONFIG.AUTH.ACCESS_TOKEN_SALT as string,
    );
  } catch (ex) {
    throw new UnauthenticatedError();
  }

  req.headers.tokenData = JSON.stringify(decoded);
  if (!decoded.isAdmin) throw new ForbiddenError();
  next();
};

export default isAdmin;
