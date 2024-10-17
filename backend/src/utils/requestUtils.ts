import { Request, Response, NextFunction } from "express";
import { nanoidGenerator } from "./index";

export class RequestUtils {
  getId = (req: Request): string => {
    return `${req.headers.requestId}`;
  };

  getIp = (req: Request) => {
    const ipData =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.ip ||
      "unknown";
    return `[${ipData}]`;
  };

  addId(req: Request, res: Response, next: NextFunction) {
    req.headers.requestId = nanoidGenerator.generateId();
    next();
  }
}
