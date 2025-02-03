import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import { PORT, publicDir } from "./config";
import {
  rateLimiter,
  corsOptions,
  errorHandler,
  requestUtils,
  customLogger,
} from "./utils/index";
import frontendRouter from "./router/frontend";
import staticFileRouter from "./router/staticFile";

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

app.use("/api/", staticFileRouter);
app.use("/", frontendRouter);

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
