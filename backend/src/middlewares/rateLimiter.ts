import { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { TooManyRequestsError } from "../models/error";

export class RateLimiter {
  makeLimit(second: number, limit: number) {
    const limiter = rateLimit({
      windowMs: second * 1000,
      limit: limit,
      standardHeaders: "draft-7",
      handler: (req: Request, res: Response) => {
        throw new TooManyRequestsError(
          `Exceeded the ${limit} requests in ${second} secondes limit`
        );
      },
    });

    return limiter;
  }
}
