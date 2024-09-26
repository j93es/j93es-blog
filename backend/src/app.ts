import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
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

app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(rateLimiter.makeLimit(60, 200));

app.use(requestUtils.addId);

app.use(express.static(publicDir));

app.get("/index/", (req: Request, res: Response) => {
  const markdownFilesMetadata = filesMetadata.getMarkdownFilesMetadata();
  res.json(markdownFilesMetadata);
});

// app.get("/file/*", (req: Request, res: Response, next: NextFunction) => {
//   const requestedPath = req.url.split("/")[2] || "index.md";
//   const filePath = path.join(publicDir, requestedPath);
//   const normalizedPath = path.normalize(filePath);

//   if (!normalizedPath.startsWith(publicDir)) {
//     return next(
//       new ForbbidenError("Path Traversal Detected: " + normalizedPath)
//     );
//   }

//   res.sendFile(normalizedPath, (err) => {
//     if (err) {
//       if (
//         (err as NodeJS.ErrnoException).code === "ENOENT" ||
//         (err as NodeJS.ErrnoException).code === "EISDIR" ||
//         (err as NodeJS.ErrnoException).code === "ENOTDIR" ||
//         (err as NodeJS.ErrnoException).code === "EPERM" ||
//         (err as NodeJS.ErrnoException).code === "EACCES" ||
//         (err as NodeJS.ErrnoException).code === "ENAMETOOLONG" ||
//         (err as NodeJS.ErrnoException).code === "ELOOP"
//       ) {
//         next(new ResourceNotFoundError("File Not Found: " + normalizedPath));
//       } else {
//         next(err);
//       }
//     }
//   });
// });

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
