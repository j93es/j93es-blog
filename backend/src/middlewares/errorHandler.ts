import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  TooManyRequestsError,
} from "../models/error";
import { customLogger } from "./index";

class ErrorHandler {
  private redirectErrorPage = (
    res: Response,
    code: number,
    message: string
  ) => {
    res.redirect(
      `/error-page/${code}.html?j93es-message=${encodeURIComponent(message)}`
    );
  };

  routerNotFound = (req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next();
    }
    throw new NotFoundError("Not Found");
  };

  notFound = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof NotFoundError) {
      const code = 404;
      const message = "요청하신 정보를 찾을 수 없습니다.";

      customLogger.log("NotFoundError", error.message, req);
      this.redirectErrorPage(res, code, message);
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
      const message = "잘못된 요청입니다.";

      customLogger.log("BadRequestError", error.message, req);
      this.redirectErrorPage(res, code, message);
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
      const message = "접속량이 많습니다. 잠시 후 다시 시도해주세요.";
      customLogger.warn("TooManyRequestsError", error.message, req);
      res.status(code).send(message);
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
      const message = "금지된 접근입니다.";

      customLogger.warn("ForbbidenError", error.message, req);
      this.redirectErrorPage(res, code, message);
      return;
    }

    next(error);
  };

  error = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.message = `${error}`;
      res.locals.error = error;

      const code = 500;
      const message = "예기치 못한 문제가 발생하였습니다.";

      customLogger.error("InternalServerError", error.message, req);
      this.redirectErrorPage(res, code, message);
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
