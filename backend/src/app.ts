import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { PORT, publicDir } from "./config";
import {
  rateLimiter,
  corsOptions,
  errorHandler,
  requestUtils,
  customLogger,
} from "./utils/index";

import { filesMetadata } from "./utils/index";

const app: Application = express();
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'none'"],
        "script-src": ["'strict-dynamic'"],
        "style-src": ["'self'"],
        "img-src": ["'self'"],
        "font-src": ["'self'"],
        "object-src": ["'none'"],
        "frame-ancestors": ["'none'"],
        "base-uri": ["'self'"],
        "form-action": ["'self'"],
        "upgrade-insecure-requests": [],
        "block-all-mixed-content": [],
      },
    },
    hsts: {
      maxAge: 63072000, // 2 years in seconds
      includeSubDomains: true, // 서브 도메인 포함
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    frameguard: {
      action: "sameorigin",
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "accelerometer=(),autoplay=(),camera=(),fullscreen=(self),geolocation=(),gyroscope=(),midi=(),microphone=(),magnetometer=(),payment=(),xr-spatial-tracking=()"
  );
  next();
});

app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(rateLimiter.makeLimit(60, 200));

app.use(requestUtils.addId);

app.use(customLogger.requestLogger);

app.use(express.static(publicDir, { etag: false, index: false, maxAge: "1d" }));

app.get("/index/", (req: Request, res: Response) => {
  const markdownFilesMetadata =
    filesMetadata.getMarkdownFilesMetadata("/posting");
  res.json(markdownFilesMetadata);
});

app.use(errorHandler.routerNotFound);
app.use(errorHandler.notFound);
app.use(errorHandler.tooManyRequestsError);
app.use(errorHandler.badRequestError);
app.use(errorHandler.forbiddenError);
app.use(errorHandler.error);

app.listen(app.get("port"), () => {
  customLogger.info(
    "Server Start",
    `Server listening on port ${app.get("port")}`
  );
});
