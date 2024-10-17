import { rateLimit } from "express-rate-limit";
import { requestUtils } from "./index";
import { TooManyRequestsError } from "../model/error";

export class RateLimiter {
  makeLimit(second: number, limit: number) {
    const limiter = rateLimit({
      windowMs: second * 1000,
      limit: limit,
      standardHeaders: "draft-7",
      handler: (req, res) => {
        throw new TooManyRequestsError(
          `Exceeded the ${limit} requests in ${second} secondes limit`
        );
      },
    });

    return limiter;
  }
}
