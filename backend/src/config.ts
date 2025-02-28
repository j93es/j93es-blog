import path from "path";
import { nanoidGenerator } from "./utils/index";

export const PORT = process.env.PORT || 8081;

export const appDefaultTitle = process.env.DEFAULT_TITLE || "j93es blog";
export const appDefaultDescription =
  process.env.DEFAULT_DESCRIPTION ||
  "개발경험과 기술적 해결과정을 기록하며, 때로는 사진으로 세상을 담아냅니다. j93es blog에서 작은 발견과 영감을 나눌 수 있기를 바랍니다.";

export const corsWhitelist: string[] = JSON.parse(
  process.env.CORS_WHITE_LIST || JSON.stringify(["http://localhost:3000"])
);

export const showingCategoryList: string[] = JSON.parse(
  process.env.SHOWING_CATEGORY_LIST ||
    JSON.stringify(["frontend", "backend", "devops", "database", "etc"])
);

export const publicDir = path.join(__dirname, "/public/");
export const apiDir = path.join(publicDir, "/api/");
export const rootDir = path.join(publicDir, "/root/");

export const ipV4RemainIndex = 2;
export const ipV6RemainIndex = 2;

export const eTag = `W/"${nanoidGenerator.generateId()}"`;
export const lastModified = new Date().toUTCString();
