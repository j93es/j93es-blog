import fs from "fs";
import path from "path";
import { apiDir } from "../config";
import { EachPostingMetadata } from "../models/postingIndex";
import { parseMarkdown } from "../utils/index";

/* 실제 파일 시스템에서 .md 파일을 읽고, 메타데이터를 생성해주는 class이다. */
// constructor에서 directoryPath는 apiDir로부터의 상대경로를 받는다.
// 즉, {apiDir}/{directoryPath}에 있는 .md 파일들을 읽어서 메타데이터를 생성해준다.
class FilesMetadataController {
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

  getMetadataList = (): EachPostingMetadata[] => {
    return JSON.parse(JSON.stringify(this.metadataList));
  };
}

export { FilesMetadataController };
