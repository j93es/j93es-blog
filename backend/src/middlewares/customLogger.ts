import { Request, Response, NextFunction } from "express";
import { requestWriter } from "./index";

export class CustomLogger {
  private getTimeMsg = (date: Date): string => {
    return new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString();
  };

  private makeSimpleMsg = (head: string, message: string) => {
    return `"${head}" ${message}`;
  };

  private makeMsg = (head: string, message: string, req?: Request) => {
    if (!req)
      return `[${this.getTimeMsg(new Date())}] ${this.makeSimpleMsg(
        head,
        message
      )}`;

    return `${requestWriter.getId(req)} ${requestWriter.getIp(
      req
    )} - - [${this.getTimeMsg(new Date())}] ${this.makeSimpleMsg(
      head,
      message
    )} - ${req.method} ${req.originalUrl} - ${req.headers["user-agent"]}`;
  };

  requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = new Date();
    const originalEnd = res.end;

    res.end = (
      chunk?: any,
      encoding?: BufferEncoding | (() => void),
      cb?: () => void
    ): Response<any, Record<string, any>> => {
      const result = originalEnd.call(
        res,
        chunk,
        encoding as BufferEncoding,
        cb
      );
      const duration = new Date().getTime() - start.getTime();
      const message = `${res.statusCode} ${duration}ms`;
      this.log("Request", message, req);
      return result;
    };

    next();
  };

  log = (head: string, message: string, req?: Request) => {
    console.log(this.makeMsg(head, message, req));
  };

  info = (head: string, message: string, req?: Request) => {
    console.info(this.makeMsg(head, message, req));
  };

  warn = (head: string, message: string, req?: Request) => {
    console.warn(this.makeMsg(head, message, req));
  };

  error = (head: string, message: string, req?: Request) => {
    console.error(this.makeMsg(head, message, req));
  };
}
