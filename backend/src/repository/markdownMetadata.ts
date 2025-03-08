import fs from "fs";
import path from "path";

import { MarkdownMetadata } from "models/markdownMetadata";
import { MarkdownMetadataRepository } from "core/repository/markdownMetadata";
import { parseMarkdown, deepCopy } from "../utils/index";

export class MarkdownMetadataRepo implements MarkdownMetadataRepository {
  private async readDirectory(baseDir: string, targetDir: string) {
    const files = await fs.promises.readdir(targetDir);

    const metadataPromises = files.map(async (file) => {
      const fullPath = path.join(targetDir, file);
      const stats = await fs.promises.lstat(fullPath);

      if (stats.isDirectory()) {
        return this.readDirectory(baseDir, fullPath);
      } else if (path.extname(fullPath) === ".md") {
        const md = await fs.promises.readFile(fullPath, "utf8");
        const policyMetadata = parseMarkdown.getMetadata(md);
        const targetPath = path.join("/", fullPath.split(baseDir)[1]);

        return {
          path: targetPath,
          title: policyMetadata?.title || "",
          date: policyMetadata?.date || "",
          tag: policyMetadata?.tag || [],
          category: policyMetadata?.category || "",
          description: policyMetadata?.description || "",
        };
      }
      return null;
    });

    const metadataList = (await Promise.all(metadataPromises))
      .flat()
      .filter((item) => item !== null) as MarkdownMetadata[];

    return metadataList;
  }

  private readDirectorySync = (
    baseDir: string,
    targetDir: string
  ): MarkdownMetadata[] => {
    const files = fs.readdirSync(targetDir);

    const data = files.map((file) => {
      const fullPath = path.join(targetDir, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        return this.readDirectorySync(baseDir, fullPath);
      } else if (path.extname(fullPath) === ".md") {
        const md = fs.readFileSync(fullPath, "utf8");
        const policyMetadata = parseMarkdown.getMetadata(md);
        const targetPath = path.join("/", fullPath.split(baseDir)[1]);

        return {
          path: targetPath,
          title: policyMetadata?.title || "",
          date: policyMetadata?.date || "",
          tag: policyMetadata?.tag || [],
          category: policyMetadata?.category || "",
          description: policyMetadata?.description || "",
        };
      }

      return null;
    });

    const metadataList = data.flat().filter((item) => item !== null);

    return metadataList;
  };

  async get(baseDir: string, targetDir: string): Promise<MarkdownMetadata[]> {
    return await this.readDirectory(baseDir, path.join(baseDir, targetDir));
  }

  getSync(baseDir: string, targetDir: string): MarkdownMetadata[] {
    return this.readDirectorySync(baseDir, path.join(baseDir, targetDir));
  }
}
