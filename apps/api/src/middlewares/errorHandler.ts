import { NextFunction, Request, Response } from "express";

import HttpStatus, {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  REQUEST_TIMEOUT,
} from "http-status/lib";
import { getMongoDbError, TimeOutError } from "@/helpers/error";
import { logErrorHandler } from "@/helpers/loggers";

/**
 * @description Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 * @param req Express.Request
 * @param res Express.Response
 * @param _next Express.NextFunction
 */
export const notFoundError = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(NOT_FOUND).json({
    error: {
      code: NOT_FOUND,
      message: HttpStatus[NOT_FOUND],
      path: req.originalUrl,
    },
  });
};

/**
 * @description Generic error response middleware for validation and internal server errors.
 * @param {*} err
 * @param {object}   req Express.Request
 * @param {object}   res Express.Response
 * @param {function} next Express.NextFunction
 */
export const genericErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // console.log("HANDLER CALLED");
  // console.log(err.name);
  if (err.name === "ValidationError") {
    const mongoError = getMongoDbError(err);
    return res.status(mongoError.status).send(mongoError.body);
  }
  let resCode: number = err.status || INTERNAL_SERVER_ERROR;
  let resBody = err;

  if (err.code === "ETIMEDOUT") {
    resCode = REQUEST_TIMEOUT;
    resBody = new TimeOutError(req.originalUrl);
  }

  logErrorHandler(req, resBody);

  return res.status(resCode).json(resBody);
};
