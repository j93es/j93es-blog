import express, { Request, Response } from "express";

import { errorPageDir } from "../config";
import { BadRequestError } from "../models/error";
import { eachErrorHandler } from "../middlewares/errorHandler";

const router = express.Router();

// error.html을 상태코드와 함께 제공
router.get("/:errorCode.html", (req: Request, res: Response) => {
  const serverErrorStatus = [400, 403, 404, 429, 500];
  const frontendErrorStatus = [1000, 1001, 1002];
  const errorCode = Number(req.params.errorCode);

  if (serverErrorStatus.includes(errorCode)) {
    res.status(errorCode);
  } else if (frontendErrorStatus.includes(errorCode)) {
    res.status(418);
  } else {
    throw new BadRequestError("잘못된 요청입니다.");
  }
  res.sendFile("/error.html", { root: errorPageDir });
});

// error.js error.css 등의 정적 파일을 제공
router.use(express.static(errorPageDir));

router.use(eachErrorHandler.routerNotFound);

export default router;
