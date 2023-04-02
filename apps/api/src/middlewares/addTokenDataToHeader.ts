import jwt from "jsonwebtoken";
import CONFIG from "@/config";

const addTokenDataToHeader = (req: Req, _res: Res, next: NextFn) => {
  const token = req.header("authorization");
  if (!token) return next();

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      CONFIG.AUTH.ACCESS_TOKEN_SALT as string,
    ) as { isAdmin: boolean; iat: number; _id: string };

    if (Date.now() / 1000 - decoded.iat > CONFIG.AUTH.ACCESS_TOKEN_EXPIRE)
      return next();
    req.headers.tokenData = JSON.stringify(decoded);
    return next();
  } catch (ex) {
    return next();
  }
};
export default addTokenDataToHeader;
