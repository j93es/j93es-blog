import { corsOptions } from "./cors";
import { CustomLogger } from "./customLogger";
import { ErrorHandler } from "./errorHandler";
import { NanoidGenerator } from "./nanoid";
import { ParseMarkdown } from "./parseMarkdown";
import { RateLimiter } from "./rateLimiter";
import { RequestUtils } from "./requestUtils";

export { corsOptions };
export const customLogger = new CustomLogger();
export const errorHandler = new ErrorHandler();
export const nanoidGenerator = new NanoidGenerator();
export const parseMarkdown = new ParseMarkdown();
export const rateLimiter = new RateLimiter();
export const requestUtils = new RequestUtils();
