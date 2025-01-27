import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";

import { PORT, publicDir, frontendUrl } from "./config";
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

app.get("/error", (req, res) => {
  // 예: /error?status=500&message=The+request+you+made+is+invalid.
  const status = parseInt((req.query.status as string) ?? 500, 10) || 500;
  const message = req.query.message || "The request you made is invalid.";

  res.status(status);

  const html = `
<!DOCTYPE html xmlns="https://www.w3.org/2000/svg">
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>${status} Error</title>
    <script>
      var countdown = 5;
      var redirectUrl = "${frontendUrl}";

      function startCountdown() {
        // countdown 값을 표시
        document.getElementById("redirectMsg").textContent =
          countdown + "초 뒤에 홈페이지로 이동합니다.";

        if (countdown > 0) {
          countdown--;
          setTimeout(startCountdown, 1000);
        } else {
          window.location.href = redirectUrl;
        }
      }

      window.onload = function () {
        startCountdown();
      };
    </script>
  </head>
  <body
    style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      background-color: #f0f6fc;
      color: #0d1117;
      margin: 0;
    "
  >
    <header style="text-align: center; width: 100%">
      <a
        href="${frontendUrl}"
        aria-label="Go to homepage"
        style="display: inline-block"
      >
        <img
          src="${frontendUrl}/logo/j93es-logo.svg"
          alt="j93es’ blog"
          width="200"
          height="100"
        />
      </a>
    </header>
    <main style="text-align: center; padding: 2rem">
      <h2>Ooops!</h2>
      <h3>${status} Error</h3>
      <p>${message}</p>
      <p id="redirectMsg"></p>
    </main>
  </body>
</html>
  `;

  res.send(html);
});

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
