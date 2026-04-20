import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  TooManyRequestsError,
  FrontendErrorBoundaryError,
  FrontendGlobalError,
  FrontendFetchError,
  ServerErrorCode,
  FrontendErrorCode,
} from "../models/error";
import { templateHtmlServ } from "../service/index";
import { customLogger } from "./index";
import { errorPageDir } from "../config";

class ErrorHandler {
  private serverErrorStatus: Record<
    ServerErrorCode,
    { [key: string]: string }
  > = {
    400: { title: "Bad Request", description: "잘못된 요청입니다." },
    403: { title: "Forbidden", description: "접근이 금지되었습니다." },
    404: {
      title: "Page Not Found",
      description: "요청하신 페이지를 찾을 수 없습니다.",
    },
    429: { title: "Too Many Requests", description: "요청이 너무 많습니다." },
    500: {
      title: "Internal Server Error",
      description: "서버에 문제가 발생했습니다.",
    },
  };

  private frontendErrorStatus: Record<
    FrontendErrorCode,
    { [key: string]: string }
  > = {
    1000: {
      title: "Frontend Error",
      description: "예기치 못한 오류가 발생했습니다.",
    },
    1001: {
      title: "Frontend Promise Error",
      description: "비동기 처리에서 예기치 못한 오류가 발생했습니다.",
    },
    1002: {
      title: "Frontend Network Error",
      description: "네트워크 오류가 발생했습니다.",
    },
  };

  private sendErrorPage = (res: Response, code: ServerErrorCode) => {
    const errorHtml = templateHtmlServ.getSync(
      errorPageDir,
      "error.html",
      this.serverErrorStatus[code]
    );
    res.status(code);
    res.send(errorHtml);
    res.end();
  };

  private sendFrontendErrorPage = (res: Response, code: FrontendErrorCode) => {
    const errorHtml = templateHtmlServ.getSync(
      errorPageDir,
      "error.html",
      this.frontendErrorStatus[code]
    );
    res.status(418);
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
      customLogger.info("NotFoundError", error.message, req);
      this.sendErrorPage(res, error.code);
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
      customLogger.info("BadRequestError", error.message, req);
      this.sendErrorPage(res, error.code);
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
      customLogger.warn("TooManyRequestsError", error.message, req);
      this.sendErrorPage(res, error.code);
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
      customLogger.warn("ForbbidenError", error.message, req);
      this.sendErrorPage(res, error.code);
      return;
    }

    next(error);
  };

  frontendErrorBoundaryError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof FrontendErrorBoundaryError) {
      customLogger.error("FrontendErrorBoundaryError", error.message, req);
      this.sendFrontendErrorPage(res, error.code);
      return;
    }

    next(error);
  };

  frontendGlobalError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof FrontendGlobalError) {
      customLogger.error("FrontendGlobalError", error.message, req);
      this.sendFrontendErrorPage(res, error.code);
      return;
    }
    next(error);
  };

  frontendFetchError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof FrontendFetchError) {
      customLogger.error("FrontendFetchError", error.message, req);
      this.sendFrontendErrorPage(res, error.code);
      return;
    }
    next(error);
  };

  error = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.message = `${error}`;
      res.locals.error = error;

      customLogger.error("InternalServerError", error.message, req);
      this.sendErrorPage(res, 500);
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
  eachErrorHandler.frontendErrorBoundaryError,
  eachErrorHandler.frontendGlobalError,
  eachErrorHandler.frontendFetchError,
  eachErrorHandler.error,
];
