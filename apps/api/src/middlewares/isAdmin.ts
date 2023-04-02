import UnauthenticatedError from "@/helpers/error/UnauthorizedError";

const isAdmin = (req: Req, _res: Res, next: NextFn) => {
  const tokenData = JSON.parse(req.headers.tokenData as string) as {
    isAdmin: boolean;
  };
  if (!tokenData) throw new UnauthenticatedError();
  if (!tokenData.isAdmin) throw new UnauthenticatedError();

  next();
};

export default isAdmin;
