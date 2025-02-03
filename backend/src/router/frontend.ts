import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

import { publicDir, apiDir } from "../config";
import { ForbiddenError, NotFoundError } from "../model/error";
import { wrapAsync } from "../utils/wrap-async";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: publicDir });
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
  res.sendFile("error-page/error.html", { root: publicDir });
});

router.use(
  express.static(publicDir, {
    etag: false,
    index: false,
    maxAge: "1d",
  })
);

// 프론트엔드 url에 해당하는 파일이 있는지 선제적으로 확인
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
      throw new NotFoundError("요청하신 파일을 찾을 수 없습니다.");
    }
  })
);

router.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: publicDir });
});

export default router;
