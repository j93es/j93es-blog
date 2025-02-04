import path from "path";

export const PORT = process.env.PORT || 8081;

export const whitelist: string[] = JSON.parse(
  process.env.CORS_WHITE_LIST || JSON.stringify(["http://localhost:3000"])
);

export const showingCategoryList: string[] = JSON.parse(
  process.env.SHOWING_CATEGORY_LIST ||
    JSON.stringify(["frontend", "backend", "devops", "database", "etc"])
);

export const publicDir = path.join(__dirname, "/public/");
export const apiDir = path.join(publicDir, "/api/");
export const frontendDir = path.join(publicDir, "/frontend/");
