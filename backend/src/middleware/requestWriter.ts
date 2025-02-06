import { Request, Response, NextFunction } from "express";
import { nanoidGenerator } from "../utils/index";
import ipaddr from "ipaddr.js";
import { ipV4RemainIndex, ipV6RemainIndex } from "../config";

export class RequestWriter {
  getId = (req: Request): string => {
    return `${req.headers.requestId}`;
  };

  addId(req: Request, res: Response, next: NextFunction) {
    req.headers.requestId = nanoidGenerator.generateId();
    next();
  }

  getIp = (req: Request) => {
    return `${req.headers.removedIp}`;
  };

  addIp = (req: Request, res: Response, next: NextFunction) => {
    const clientIp = this.getClientIp(req);
    const removedIp = this.removeIpPart(clientIp);

    req.headers.removedIp = removedIp;
    next();
  };

  private getClientIp = (req: Request): string => {
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string") {
      return xForwardedFor.split(",")[0].trim();
    } else if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
      return xForwardedFor[0].trim();
    }

    const xRealIp = req.headers["x-real-ip"];
    if (typeof xRealIp === "string") {
      return xRealIp;
    } else if (Array.isArray(xRealIp) && xRealIp.length > 0) {
      return xRealIp[0].trim();
    }

    return req.socket.remoteAddress || "";
  };

  private removeIpPart = (ipStr: string): string => {
    // IPv4 처리
    if (ipaddr.IPv4.isValid(ipStr)) {
      try {
        const addr = ipaddr.IPv4.parse(ipStr);
        const fullIp: string = addr.toNormalizedString();
        const parts: string[] = fullIp.split(".");
        const newParts = parts.map((elem, idx) =>
          idx < ipV4RemainIndex ? elem : ""
        );
        return newParts.join(".");
      } catch (e) {
        return "";
      }
    }
    // IPv6 처리
    else if (ipaddr.IPv6.isValid(ipStr)) {
      try {
        const addr = ipaddr.IPv6.parse(ipStr);
        // toNormalizedString()는 8그룹의 4자리 16진수 표기를 반환합니다.
        const fullIp: string = addr.toNormalizedString();
        const parts: string[] = fullIp.split(":");
        const newParts = parts.map((elem, idx) =>
          idx < ipV6RemainIndex ? elem : ""
        );
        return newParts.join(":");
      } catch (e) {
        return "";
      }
    } else {
      return "";
    }
  };
}
