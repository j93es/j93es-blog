import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { publicDir, showingCategoryList } from "../config";
import { PostingData } from "../interface/PostingData";

export class FilesMetadata {
  private postingData: PostingData | null = null;

  private makeRawPostingData = (directoryPath: string) => {
    const rawPostingData: PostingData = {};

    showingCategoryList.forEach((category: string, index: number) => {
      rawPostingData[category] = { order: index, data: [] };
    });

    const readDirectory = (dirPath: string) => {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);

        if (fs.lstatSync(fullPath).isDirectory()) {
          readDirectory(fullPath);
        } else if (path.extname(fullPath) === ".md") {
          const markdownContent = fs.readFileSync(fullPath, "utf-8");
          const { data } = matter(markdownContent);

          if (!showingCategoryList.includes(data.category)) {
            return;
          }
          rawPostingData[data.category].data.push({
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
    Object.keys(rawPostingData).forEach((key) => {
      if (rawPostingData[key].data.length === 0) {
        delete rawPostingData[key];
      }
    });

    return rawPostingData;
  };

  private sortPostingData = (postingData: PostingData) => {
    Object.keys(postingData).map((key) => {
      postingData[key].data.sort((a, b) => {
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
    });

    return postingData;
  };

  getMarkdownFilesMetadata = (directoryPath: string) => {
    if (this.postingData === null) {
      const rawPostingData = this.makeRawPostingData(
        path.join(publicDir, directoryPath)
      );
      this.postingData = this.sortPostingData(rawPostingData);
    }

    return this.postingData;
  };
}
