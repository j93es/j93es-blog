import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  TooManyRequestsError,
} from "../model/error";
import { customLogger } from "./index";
import { errorPageUrl } from "../config";

export class ErrorHandler {
  private redirectErrorPage = (res: any, code: number, message: string) => {
    res
      .status(code)
      .redirect(
        `${errorPageUrl}/error.html?j93es-status=${code}&j93es-message=${encodeURIComponent(
          message
        )}`
      );
  };

  routerNotFound = (req: any, res: any, next: any) => {
    if (res.headersSent) {
      return next();
    }
    throw new NotFoundError("Not Found");
  };

  notFound = (error: any, req: any, res: any, next: any) => {
    if (error instanceof NotFoundError) {
      const code = 404;
      const message = encodeURIComponent("요청하신 정보를 찾을 수 없습니다.");

      customLogger.log("NotFoundError", error.message, req);
      this.redirectErrorPage(res, code, message);
      return;
    }

    next(error);
  };

  badRequestError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof BadRequestError) {
      const code = 400;
      const message = encodeURIComponent("잘못된 요청입니다.");

      customLogger.log("BadRequestError", error.message, req);
      this.redirectErrorPage(res, code, message);
      return;
    }
    next(error);
  };

  tooManyRequestsError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof TooManyRequestsError) {
      const code = 429;
      const message = encodeURIComponent(
        "접속량이 많습니다. 잠시 후 다시 시도해주세요."
      );

      customLogger.warn("TooManyRequestsError", error.message, req);
      this.redirectErrorPage(res, code, message);
      return;
    }

    next(error);
  };

  forbiddenError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof ForbiddenError) {
      const code = 403;
      const message = encodeURIComponent("금지된 접근입니다.");

      customLogger.warn("ForbbidenError", error.message, req);
      this.redirectErrorPage(res, code, message);
      return;
    }

    next(error);
  };

  error = (error: any, req: any, res: any, next: any) => {
    try {
      res.locals.message = `${error}`;
      res.locals.error = error;

      const code = 500;
      const message = encodeURIComponent("예기치 못한 문제가 발생하였습니다.");

      customLogger.error("InternalServerError", error.message, req);
      this.redirectErrorPage(res, code, message);
    } catch (err) {
      res.end();
    }
  };
}
