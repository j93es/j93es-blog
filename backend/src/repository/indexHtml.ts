import fs from "fs";
import path from "path";
import { IndexHtmlRepository } from "../core/repository/indexHtml";
import { rootDir } from "../config";

export class IndexHtmlRepo implements IndexHtmlRepository {
  async get(): Promise<string> {
    const indexHtmlPath = path.join(rootDir, "index.html");

    let rawHtml = "";
    try {
      rawHtml = await fs.promises.readFile(indexHtmlPath, "utf8");
    } catch (error) {
      console.error("Failed to read index.html file.");
    }

    return rawHtml;
  }

  getSync(): string {
    const indexHtmlPath = path.join(rootDir, "index.html");

    let rawHtml = "";
    try {
      rawHtml = fs.readFileSync(indexHtmlPath, "utf8");
    } catch (error) {
      console.error("Failed to read index.html file.");
    }

    return rawHtml;
  }
}
