import fs from "fs";
import path from "path";
import { apiDir, showingCategoryList } from "../config";
import { PostingIndex } from "../model/postingIndex";
import { PostingIndexController } from "./index";
import { parseMarkdown } from "../utils/index";

// constructor에서 directoryPath를 받아서 사용하는데, 이는 apiDir로부터의 상대경로이다.
// makeRawPostingIndex 메서드는 apiDir로부터의 상대경로를 받아서 PostingIndex를 만들어 반환한다.
export class FilesMetadataController {
  private postingIndex: PostingIndex | null = null;
  private directoryPath: string;

  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
  }

  private makeRawPostingIndex = (): PostingIndex => {
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
            path: path.join("/", fullPath.split(apiDir)[1]),
          });
        }
      });
    };

    readDirectory(path.join(apiDir, this.directoryPath));
    Object.keys(rawPostingIndex).forEach((key) => {
      if (rawPostingIndex[key].data.length === 0) {
        delete rawPostingIndex[key];
      }
    });

    return rawPostingIndex;
  };

  getMarkdownFilesMetadata = (): PostingIndex => {
    if (this.postingIndex === null) {
      const rawPostingIndex = this.makeRawPostingIndex();
      this.postingIndex = new PostingIndexController(
        rawPostingIndex
      ).getPostingIndex();

      return this.postingIndex as PostingIndex;
    }

    return this.postingIndex;
  };
}
