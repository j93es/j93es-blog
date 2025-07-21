import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

import { rootDir, apiDir } from "../config";
import { ForbiddenError, NotFoundError } from "../models/error";
import { wrapAsync, eachErrorHandler } from "../middlewares/index";
import { templateHtmlServ, postingIndexServ } from "../service/index";
import { makeTitleDescription } from "../utils/index";
import { markdownMetadataRepo } from "../repository/index";

const router = express.Router();

const getTokenVlaue = (
  path: string
): { title: string; description: string } | null => {
  let result: { title: string; description: string } | null = null;

  // 루트 경로에는 기본 값 사용
  if (path === "/") {
    return makeTitleDescription({ useDefault: true });
  }

  // 각 posting path 별 순회
  postingIndexServ.controller?.getCategoryList().forEach((category: string) => {
    const postingList = postingIndexServ.controller?.getPostingList(category);
    postingList?.forEach((posting) => {
      if (result) return;

      if (posting.path === path) {
        result = makeTitleDescription({
          ...posting,
        });
      }
    });
  });
  if (result) {
    return result;
  }

  const policyMetadataList = markdownMetadataRepo.getSync(apiDir, "/policy/");
  // 각 policy path 별로 token의 value를 만들어 저장
  policyMetadataList.forEach((metadata) => {
    if (result) return;

    if (metadata.path === path) {
      result = makeTitleDescription({
        ...metadata,
      });
    }
  });
  if (result) {
    return result;
  }

  return null;
};

// index.html을 제공
router.get(
  "/",
  wrapAsync(async (req: Request, res: Response) => {
    const tokenValue = getTokenVlaue("/");
    if (!tokenValue) {
      throw new NotFoundError("요청하신 페이지를 찾을 수 없습니다.");
    }

    const html = await templateHtmlServ.get(rootDir, "index.html", tokenValue);
    res.send(html);
  })
);

// logo, favicon, manifest.json 등의 정적 파일을 제공
router.use(express.static(rootDir));

// apiDir을 root로 url의 path에 해당하는 파일이 있는지 선제적으로 확인
// 없다면 에러 페이지로 리디렉션
// 있다면 index.html을 제공
// frontend에서 example.com/posting/ex.md로 라우팅되면 frontend는 example.com/api/posting/ex.md로 마크다운 파일을 요청함
// 즉, apiDir에 frontend에서 요청"할" 파일이 있는지 선제적으로 확인하고 없다면 에러 페이지로 리디렉션
router.get(
  "/*path",
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const resolvedApiDir = path.resolve(apiDir);

    // 1. .md 파일이 아니면 넘김
    if (!req.path.endsWith(".md")) {
      return next();
    }

    // 2. 요청 경로 정규화
    const requestedPath = path.join(apiDir, req.path);
    const resolvedPath = path.resolve(requestedPath);

    // 3. 디렉터리 외부 접근 차단
    if (!resolvedPath.startsWith(resolvedApiDir + path.sep)) {
      throw new ForbiddenError("잘못된 경로로 접근하셨습니다.");
    }

    // 4. reqPath 생성 및 토큰 확인
    const reqPath = path.join("/", path.relative(resolvedApiDir, resolvedPath));
    const tokenValue = getTokenVlaue(reqPath);
    if (!tokenValue) {
      throw new NotFoundError("요청하신 페이지를 찾을 수 없습니다.");
    }

    try {
      await fs.promises.access(resolvedPath, fs.constants.F_OK);
    } catch (err) {
      throw new NotFoundError("요청하신 페이지를 찾을 수 없습니다.");
    }

    const html = await templateHtmlServ.get(rootDir, "index.html", tokenValue);
    res.send(html);
  })
);

router.use(eachErrorHandler.routerNotFound);

export default router;
