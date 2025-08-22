import path from "path";
import fs from "fs";
import { nanoidGenerator } from "./utils/index";

export const PORT = process.env.PORT || 8081;

export const appDefaultTitle = "j93es blog";
export const appDefaultDescription =
  "엔지니어링 경험에서 얻은 인사이트를 기록하고, 철학에 대한 이야기를 다룹니다. 때로는 사진으로 세상을 바라봅니다. j93es blog에서 작은 발견과 영감을 나눌 수 있기를 바랍니다.";

export const corsWhitelist: string[] = JSON.parse(
  process.env.CORS_WHITE_LIST || JSON.stringify(["http://localhost:3000"])
);

export const showingCategoryList: string[] = ["engineering", "photo"];

export const publicDir = path.join(__dirname, "public");
export const apiDir = path.join(publicDir, "api");
export const rootDir = path.join(publicDir, "root");
export const errorPageDir = path.join(rootDir, "error-page");

export const ipV4RemainIndex = 2;
export const ipV6RemainIndex = 2;

let _etag = null;
let _lastmod = null;
try {
  const data = fs.readFileSync(
    path.join(publicDir, "cacheVerificationHeader.json"),
    "utf8"
  );
  ({ etag: _etag, lastmod: _lastmod } = JSON.parse(data));
} catch (error) {
  console.error("Failed to read cacheVerificationHeader.json file.");
}

export const eTag = _etag || `W/"${nanoidGenerator.generateId()}"`;
export const lastmod = _lastmod || new Date().toUTCString();

export const monitoringKey = process.env.MONITORING_KEY || "monitoring";
