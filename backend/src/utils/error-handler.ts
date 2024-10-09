import path from "path";
import {
  BadRequestError,
  NotFoundError,
  ForbbidenError,
  TooManyRequestsError,
} from "../interface/error";
import { customLogger } from "./index";
import { publicDir } from "../config";

const errorPagesPath = path.join(publicDir, "error-pages");

export class ErrorHandler {
  routerNotFound = (req: any, res: any, next: any) => {
    if (res.headersSent) {
      return next();
    }
    throw new NotFoundError("Not Found");
  };

  notFound = (error: any, req: any, res: any, next: any) => {
    if (error instanceof NotFoundError) {
      customLogger.log("NotFoundError", error.message, req);
      res.status(404).sendFile(path.join(errorPagesPath, "404.html"));

      return;
    }

    next(error);
  };

  badRequestError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof BadRequestError) {
      customLogger.log("BadRequestError", error.message, req);
      res.status(400).sendFile(path.join(errorPagesPath, "400.html"));
      return;
    }
    next(error);
  };

  tooManyRequestsError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof TooManyRequestsError) {
      customLogger.warn("TooManyRequestsError", error.message, req);
      res.status(429).sendFile(path.join(errorPagesPath, "429.html"));
      return;
    }

    next(error);
  };

  forbiddenError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof ForbbidenError) {
      customLogger.warn("ForbbidenError", error.message, req);
      res.status(403).sendFile(path.join(errorPagesPath, "403.html"));
      return;
    }

    next(error);
  };

  error = (error: any, req: any, res: any, next: any) => {
    try {
      res.locals.message = `${error}`;
      res.locals.error = error;

      customLogger.error("InternalServerError", error.message, req);
      res.status(500).sendFile(path.join(errorPagesPath, "500.html"));
    } catch (err) {
      res.end();
    }
  };
}
