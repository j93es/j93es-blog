import { corsMiddleware } from "./cors";
import { CustomLogger } from "./customLogger";
import { eachErrorHandler, errorHandlers } from "./errorHandler";
import { headerSetter } from "./headerSetter";
import { RateLimiter } from "./rateLimiter";
import { RequestWriter } from "./requestWriter";
import { wrapAsync } from "./wrapAsync";

export { corsMiddleware };
export const customLogger = new CustomLogger();
export { eachErrorHandler, errorHandlers };
export { headerSetter };
export const rateLimiter = new RateLimiter();
export const requestWriter = new RequestWriter();
export { wrapAsync };
