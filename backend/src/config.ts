import path from "path";

export const PORT = process.env.PORT || 8081;

export const frontendUrl = process.env.FRONTEND_URL || "https://j93.es";

export const whitelist = JSON.parse(
  process.env.CORS_WHITE_LIST || JSON.stringify(["http://localhost:3000"])
);

export const publicDir = path.join(__dirname, "public");

export const showingCategoryList = JSON.parse(
  process.env.SHOWING_CATEGORY_LIST ||
    JSON.stringify(["frontend", "backend", "devops", "database", "etc"])
);
