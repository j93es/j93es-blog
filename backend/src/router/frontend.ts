import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

import { frontendDir, apiDir } from "../config";
import { ForbiddenError, NotFoundError } from "../model/error";
import { wrapAsync } from "../middleware/wrapAsync";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: frontendDir });
});

router.get("/error-page/error.html", (req: Request, res: Response) => {
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
  res.sendFile("error-page/error.html", { root: frontendDir });
});

router.use(
  express.static(frontendDir, {
    etag: false,
    index: false,
    maxAge: "1d",
  })
);

// apiDir을 root로 url의 path에 해당하는 파일이 있는지 선제적으로 확인
// 없다면 에러 페이지로 리디렉션
router.use(
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const requestedPath = path.join(apiDir, req.path);
    const resolvedPath = path.resolve(requestedPath);

    if (!resolvedPath.startsWith(apiDir)) {
      throw new ForbiddenError("잘못된 경로로 접근하셨습니다.");
    }

    try {
      await fs.promises.access(resolvedPath, fs.constants.F_OK);
      next();
    } catch (err) {
      throw new NotFoundError("요청하신 페이지를 찾을 수 없습니다.");
    }
  })
);

router.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: frontendDir });
});

export default router;
