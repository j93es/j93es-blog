import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";

import { PORT, publicDir } from "./config";
import {
  rateLimiter,
  corsOptions,
  errorHandler,
  requestUtils,
  customLogger,
} from "./utils/index";

import { filesMetadata } from "./service/index";

const app: Application = express();
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);
app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(rateLimiter.makeLimit(60, 200));

app.use(requestUtils.addId);

app.use(customLogger.requestLogger);

app.get("/index/", (req: Request, res: Response) => {
  const markdownFilesMetadata =
    filesMetadata.getMarkdownFilesMetadata("/posting/");
  res.json(markdownFilesMetadata);
});

app.use(
  express.static(publicDir, {
    etag: false,
    index: false,
    maxAge: "1d",
    setHeaders: (res: Response, filePath, stat) => {
      if (filePath.endsWith("/public/error-page/error.html")) {
        const queryStatusKey = "j93es-status";
        const allowedErrorStatus = [400, 403, 404, 429, 500];

        const status = Number(res.req.query[queryStatusKey]);

        if (allowedErrorStatus.includes(status)) {
          res.status(status);
        } else {
          res.status(400);
        }
      }
    },
  })
);

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
