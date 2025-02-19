import fs from "fs";
import path from "path";
import { apiDir, showingCategoryList } from "../config";
import { EachPostingMetadata, PostingIndex } from "../models/postingIndex";
import { parseMarkdown } from "../utils/index";

/* 실제 파일 시스템에서 .md 파일을 읽고, 메타데이터를 생성해주는 class이다. */
// constructor에서 directoryPath는 apiDir로부터의 상대경로를 받는다.
// 즉, {apiDir}/{directoryPath}에 있는 .md 파일들을 읽어서 메타데이터를 생성해준다.
export class FilesMetadataController {
  private postingIndex: PostingIndex | null = null;
  private metadataList: EachPostingMetadata[] = [];
  private directoryPath: string;

  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
    this.readDirectory(path.join(apiDir, this.directoryPath));
  }

  private readDirectory = (dirPath: string) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        this.readDirectory(fullPath);
      } else if (path.extname(fullPath) === ".md") {
        const md = fs.readFileSync(fullPath, "utf8");
        const policyMetadata = parseMarkdown.getData(md);
        const targetPath = path.join("/", fullPath.split(apiDir)[1]);
        this.metadataList.push({
          path: targetPath,
          title: policyMetadata.title,
          date: policyMetadata.date,
          tag: policyMetadata.tag,
          category: policyMetadata.category,
          description: policyMetadata.description,
        });
      }
    });
  };

  getMarkdownFilesMetadata = (): PostingIndex => {
    if (this.postingIndex !== null) {
      return JSON.parse(JSON.stringify(this.postingIndex));
    }

    const rawPostingIndex: PostingIndex = {};

    showingCategoryList.forEach((category: string, index: number) => {
      rawPostingIndex[category] = { order: index, data: [] };
    });

    this.metadataList.forEach((metadata) => {
      if (!showingCategoryList.includes(metadata.category)) {
        return;
      }
      rawPostingIndex[metadata.category].data.push({
        title: metadata.title,
        date: metadata.date,
        tag: metadata.tag,
        category: metadata.category,
        description: metadata.description,
        path: metadata.path,
      });
    });

    Object.keys(rawPostingIndex).forEach((key) => {
      if (rawPostingIndex[key].data.length === 0) {
        delete rawPostingIndex[key];
      }
    });

    this.postingIndex = rawPostingIndex;
    return JSON.parse(JSON.stringify(rawPostingIndex));
  };

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
          const data = parseMarkdown.getData(markdownContent);

          if (!showingCategoryList.includes(data.category)) {
            return;
          }
          rawPostingIndex[data.category].data.push({
            title: data.title,
            date: data.date,
            tag: data.tag,
            category: data.category,
            path: path.join("/", fullPath.split(apiDir)[1]),
            description: data.description,
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
}
