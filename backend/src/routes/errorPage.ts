import express, { Request, Response } from "express";

import { errorPageDir } from "../config";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  FrontendErrorBoundaryError,
  FrontendGlobalError,
  FrontendFetchError,
} from "../models/error";
import { eachErrorHandler, wrapAsync } from "../middlewares/index";

const router = express.Router();

// error.html을 상태코드와 함께 제공
router.get("/:errorCode.html", (req: Request, res: Response) => {
  try {
    Number(req.params.errorCode);
  } catch (error) {
    return res.redirect(`${req.baseUrl}/400.html`);
  }
  const errorCode = Number(req.params.errorCode);

  if (errorCode === 400) {
    throw new BadRequestError("잘못된 요청입니다.");
  }
  if (errorCode === 403) {
    throw new ForbiddenError("접근이 금지되었습니다.");
  }
  if (errorCode === 404) {
    throw new NotFoundError("요청하신 페이지를 찾을 수 없습니다.");
  }
  if (errorCode === 429) {
    throw new TooManyRequestsError("요청이 너무 많습니다.");
  }
  if (errorCode === 500) {
    throw new Error("서버에 문제가 발생했습니다.");
  }
  if (errorCode === 1000) {
    throw new FrontendErrorBoundaryError("예기치 못한 오류가 발생했습니다.");
  }
  if (errorCode === 1001) {
    throw new FrontendGlobalError(
      "비동기 처리에서 예기치 못한 오류가 발생했습니다."
    );
  }
  if (errorCode === 1002) {
    throw new FrontendFetchError("네트워크 오류가 발생했습니다.");
  }

  return res.redirect(`${req.baseUrl}/400.html`);
});

// error.js error.css 등의 정적 파일을 제공
router.use(express.static(errorPageDir));

router.use(eachErrorHandler.routerNotFound);

export default router;
