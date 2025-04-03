import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  TooManyRequestsError,
} from "../models/error";
import { customLogger } from "./index";
import { ErrorCode } from "../models/error";
import { errorHtmlServ } from "../service/index";

class ErrorHandler {
  private sendErrorPage = (res: Response, code: ErrorCode) => {
    const errorHtml = errorHtmlServ.get(code);
    res.status(code);
    res.send(errorHtml);
    res.end();
  };

  routerNotFound = (req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next();
    }
    throw new NotFoundError("Router Not Found");
  };

  notFound = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof NotFoundError) {
      const code = 404;

      customLogger.info("NotFoundError", error.message, req);
      this.sendErrorPage(res, code);
      return;
    }

    next(error);
  };

  badRequestError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof BadRequestError) {
      const code = 400;

      customLogger.info("BadRequestError", error.message, req);
      this.sendErrorPage(res, code);
      return;
    }
    next(error);
  };

  tooManyRequestsError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof TooManyRequestsError) {
      const code = 429;

      customLogger.warn("TooManyRequestsError", error.message, req);
      this.sendErrorPage(res, code);
      return;
    }

    next(error);
  };

  forbiddenError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof ForbiddenError) {
      const code = 403;

      customLogger.warn("ForbbidenError", error.message, req);
      this.sendErrorPage(res, code);
      return;
    }

    next(error);
  };

  error = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.message = `${error}`;
      res.locals.error = error;

      const code = 500;

      customLogger.error("InternalServerError", error.message, req);
      this.sendErrorPage(res, code);
    } catch (err) {
      res.end();
    }
  };
}

export const eachErrorHandler = new ErrorHandler();

export const errorHandlers = [
  eachErrorHandler.routerNotFound,
  eachErrorHandler.notFound,
  eachErrorHandler.tooManyRequestsError,
  eachErrorHandler.badRequestError,
  eachErrorHandler.forbiddenError,
  eachErrorHandler.error,
];
