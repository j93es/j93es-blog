import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

import { frontendDir, apiDir } from "../config";
import { ForbiddenError, NotFoundError } from "../models/error";
import { wrapAsync } from "../middlewares/wrapAsync";
import { indexHtmlController } from "../controllers/index";

const router = express.Router();

// index.html을 제공
router.get("/", (req: Request, res: Response) => {
  res.send(indexHtmlController.getIndexHtml("/"));
});

// error.html을 상태코드와 함께 제공
router.get("/error-page/error.html", (req: Request, res: Response) => {
  const queryStatusKey = "j93es-status";
  const allowedErrorStatus = [400, 403, 404, 429, 500];
  const frontendErrorStatus = [1000, 1001];
  const status = Number(req.query[queryStatusKey]);

  if (allowedErrorStatus.includes(status)) {
    res.status(status);
  } else if (frontendErrorStatus.includes(status)) {
    res.status(424);
  } else {
    res.status(400);
  }
  res.sendFile("error-page/error.html", { root: frontendDir });
});

// logo, favicon, manifest.json 등의 정적 파일을 제공
router.use(express.static(frontendDir));

// apiDir을 root로 url의 path에 해당하는 파일이 있는지 선제적으로 확인
// 없다면 에러 페이지로 리디렉션
// 있다면 index.html을 제공
// frontend에서 example.com/posting/ex.md로 라우팅되면 frontend는 example.com/api/posting/ex.md로 마크다운 파일을 요청함
// 즉, apiDir에 frontend에서 요청"할" 파일이 있는지 선제적으로 확인하고 없다면 에러 페이지로 리디렉션
router.get(
  "*",
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const requestedPath = path.join(apiDir, req.path);
    const resolvedPath = path.normalize(requestedPath);

    if (!resolvedPath.startsWith(apiDir)) {
      throw new ForbiddenError("잘못된 경로로 접근하셨습니다.");
    }

    try {
      await fs.promises.access(resolvedPath, fs.constants.F_OK);
    } catch (err) {
      throw new NotFoundError("요청하신 페이지를 찾을 수 없습니다.");
    }

    const indexHtml = indexHtmlController.getIndexHtml(req.path);
    res.send(indexHtml);
  })
);

export default router;
