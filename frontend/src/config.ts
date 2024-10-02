export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/";

export const categoryList = JSON.parse(
  process.env.REACT_APP_CATEGORY_LIST ||
    JSON.stringify(["all", "tech", "life", "etc"])
);
