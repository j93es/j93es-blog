import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import { PORT } from "./config";
import {
  rateLimiter,
  corsMiddleware,
  requestWriter,
  customLogger,
  errorHandlers,
} from "./middleware/index";
import frontendRouter from "./router/frontend";
import apiRouter from "./router/api";

const app: Application = express();

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);
app.disable("x-powered-by");

app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(rateLimiter.makeLimit(60, 200));
app.use(requestWriter.addId);
app.use(customLogger.requestLogger);

app.use("/api/", apiRouter);
app.use("/", frontendRouter);
app.use(errorHandlers);

app.listen(app.get("port"), () => {
  customLogger.info(
    "Server Start",
    `Server listening on port ${app.get("port")}`
  );
});
