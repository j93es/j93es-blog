import dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { PORT, publicDir } from "./config";
import {
  rateLimiter,
  corsOptions,
  errorHandler,
  requestUtils,
  customLogger,
} from "./utils/index";
import { FilesMetadataController } from "./controller/index";
import { NotFoundError, ForbiddenError } from "./model/error";

const app: Application = express();
const postingMetadata = new FilesMetadataController("/posting/");

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(rateLimiter.makeLimit(60, 200));
app.use(requestUtils.addId);
app.use(customLogger.requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: publicDir });
});

app.get("/index/", (req: Request, res: Response) => {
  const metadata = postingMetadata.getMarkdownFilesMetadata();
  res.json(metadata);
});

app.get("/error-page/error.html", (req: Request, res: Response) => {
  const queryStatusKey = "j93es-status";
  const allowedErrorStatus = [400, 403, 404, 429, 500];
  const frontendErrorStatus = [1000, 1001, 1002];
  const status = Number(req.query[queryStatusKey]);

  if (allowedErrorStatus.includes(status)) {
    res.status(status);
  } else if (frontendErrorStatus.includes(status)) {
    res.status(424);
  } else {
    res.status(400);
  }
  res.sendFile("error-page/error.html", { root: publicDir });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const requestedPath = path.join(publicDir, req.path);
  const resolvedPath = path.resolve(requestedPath);

  if (!resolvedPath.startsWith(publicDir)) {
    return next(new ForbiddenError("잘못된 경로로 접근하셨습니다."));
  }

  try {
    fs.accessSync(resolvedPath, fs.constants.F_OK);
    next();
  } catch (err) {
    next(new NotFoundError("요청하신 파일을 찾을 수 없습니다."));
  }
});

app.use(
  express.static(publicDir, {
    etag: false,
    index: false,
    maxAge: "1d",
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
