import { Request, Response, NextFunction } from "express";
import { requestUtils } from "./index";

export class CustomLogger {
  private formatDateToCustomString = (date: Date) => {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}:${hours}:${minutes}:${seconds} +0000`;
    return formattedDate;
  };

  private makeSimpleMsg = (head: string, message: string) => {
    return `"${head}" ${message}`;
  };

  private makeMsg = (head: string, message: string, req?: Request) => {
    if (!req)
      return `[${this.formatDateToCustomString(
        new Date()
      )}] ${this.makeSimpleMsg(head, message)}`;

    return `${requestUtils.getId(req)} ${requestUtils.getIp(
      req
    )} - - [${this.formatDateToCustomString(new Date())}] ${this.makeSimpleMsg(
      head,
      message
    )} - ${req.method} ${req.url} - ${req.headers["user-agent"]}`;
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
