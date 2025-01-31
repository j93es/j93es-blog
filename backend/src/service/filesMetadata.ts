import fs from "fs";
import path from "path";
import { publicDir, showingCategoryList } from "../config";
import { PostingIndex } from "../model/postingIndex";
import { PostingIndexController } from "../controller/index";
import { parseMarkdown } from "../utils/index";

export class FilesMetadata {
  private postingIndex: PostingIndex | null = null;

  private makeRawPostingIndex = (directoryPath: string) => {
    const rawPostingIndex: PostingIndex = {};

    showingCategoryList.forEach((category: string, index: number) => {
      rawPostingIndex[category] = { order: index, data: [] };
    });

    const readDirectory = (dirPath: string) => {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);

        if (fs.lstatSync(fullPath).isDirectory()) {
          readDirectory(fullPath);
        } else if (path.extname(fullPath) === ".md") {
          const markdownContent = fs.readFileSync(fullPath, "utf-8");
          const { data } = parseMarkdown.get(markdownContent);

          if (!showingCategoryList.includes(data.category)) {
            return;
          }
          rawPostingIndex[data.category].data.push({
            title: data.title,
            date: data.date,
            tag: data.tag,
            category: data.category,
            path: fullPath.split(publicDir)[1],
          });
        }
      });
    };

    readDirectory(directoryPath);
    Object.keys(rawPostingIndex).forEach((key) => {
      if (rawPostingIndex[key].data.length === 0) {
        delete rawPostingIndex[key];
      }
    });

    return rawPostingIndex;
  };

  getMarkdownFilesMetadata = (directoryPath: string) => {
    if (this.postingIndex === null) {
      const rawPostingIndex = this.makeRawPostingIndex(
        path.join(publicDir, directoryPath)
      );
      this.postingIndex = new PostingIndexController(
        rawPostingIndex
      ).getPostingIndex();
    }

    return this.postingIndex;
  };
}
