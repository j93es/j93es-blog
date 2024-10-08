import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { publicDir } from "../config";
import { MarkdownMetadata } from "../interface/metadata";

export class FilesMetadata {
  private markdownFilesMetadata: MarkdownMetadata[] | null = null;

  private makeRawMarkdownFilesMetadata = (directoryPath: string) => {
    const rawMarkdownFilesMetadata: MarkdownMetadata[] = [];

    const readDirectory = (dirPath: string) => {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);

        if (fs.lstatSync(fullPath).isDirectory()) {
          readDirectory(fullPath);
        } else if (path.extname(fullPath) === ".md") {
          const markdownContent = fs.readFileSync(fullPath, "utf-8");
          const { data } = matter(markdownContent);

          rawMarkdownFilesMetadata.push({
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
    return rawMarkdownFilesMetadata;
  };

  private sortMarkdownFilesMetadata = (metadata: MarkdownMetadata[]) => {
    return metadata.sort((a, b) => {
      const categoryGap = a.category.localeCompare(b.category);
      if (categoryGap !== 0) {
        return categoryGap;
      }

      const dateGap = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateGap !== 0) {
        return dateGap;
      }

      const titleGap = a.title.localeCompare(b.title);
      if (titleGap !== 0) {
        return titleGap;
      }

      return 0;
    });
  };

  getMarkdownFilesMetadata = (directoryPath: string) => {
    if (this.markdownFilesMetadata === null) {
      const rawMarkdownFilesMetadata = this.makeRawMarkdownFilesMetadata(
        path.join(publicDir, directoryPath)
      );
      this.markdownFilesMetadata = this.sortMarkdownFilesMetadata(
        rawMarkdownFilesMetadata
      );
    }

    return this.markdownFilesMetadata;
  };
}
