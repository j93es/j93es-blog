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
  headerSetter,
} from "./middlewares/index";
import rootRouter from "./routes/root";
import apiRouter from "./routes/api";

const app: Application = express();

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);
app.disable("x-powered-by");

app.use([
  headerSetter.setHeader,
  corsMiddleware,
  rateLimiter.makeLimit(60, 200),
  express.json({ limit: "1mb" }),
  express.urlencoded({ extended: false }),
  requestWriter.addId,
  requestWriter.addIp,
  customLogger.requestLogger,
]);

app.use("/api/", apiRouter);
app.use("/", rootRouter);

app.use(errorHandlers);

app.listen(app.get("port"), () => {
  customLogger.info(
    "Server Start",
    `Server listening on port ${app.get("port")}`
  );
});
