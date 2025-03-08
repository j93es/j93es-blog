// External

// Local

import { PostingIndex } from "../models/postingIndex";
import { MarkdownMetadata } from "../models/markdownMetadata";
import { deepCopy } from "../utils/index";

/* PostingIndex를 받아서 PostingIndex를 정렬하고, PostingIndex의 정보를 편리하게 가져올 수 있도록 하는 class이다. */
export class PostingIndexController {
  private postingIndex: PostingIndex;
  private categoryListCache: string[] | null;

  constructor(postingIndex: PostingIndex) {
    this.categoryListCache = null;
    this.postingIndex = deepCopy(postingIndex);
    this.sortPostingIndex();
  }

  private sortPostingIndex = () => {
    this.getCategoryList().forEach((category) => {
      this.postingIndex[category].data = this.getPostingList(category).sort(
        (a, b) => {
          const dateGap =
            new Date(b.date).getTime() - new Date(a.date).getTime();
          if (dateGap !== 0) {
            return dateGap;
          }

          const titleGap = a.title.localeCompare(b.title);
          if (titleGap !== 0) {
            return titleGap;
          }

          return 0;
        }
      );
    });

    return this.getPostingIndex();
  };

  public getPostingIndex = (): PostingIndex | null => {
    return deepCopy(this.postingIndex);
  };

  public getCategoryList = (): string[] | [] => {
    if (!this.categoryListCache) {
      this.categoryListCache = Object.keys(this.postingIndex).sort((a, b) => {
        if (!this.postingIndex) {
          return 0;
        }
        return this.postingIndex[a].order - this.postingIndex[b].order;
      });
    }

    return deepCopy(this.categoryListCache);
  };

  public getPostingList = (category: string): MarkdownMetadata[] | [] => {
    if (!this.postingIndex[category]) {
      return [];
    }

    return deepCopy(this.postingIndex[category].data);
  };

  public getMarkdownMetadata = (
    category: string,
    target: string,
    by: keyof MarkdownMetadata
  ): MarkdownMetadata | null => {
    return (
      this.postingIndex[category].data.find(
        (posting) => posting[by] === target
      ) ?? null
    );
  };

  public getNextPostingMetadata = (
    category: string,
    title: string
  ): MarkdownMetadata | null => {
    const postingList = this.getPostingList(category);
    const index = postingList.findIndex((posting) => posting.title === title);
    if (index === 0) {
      return null;
    }

    return postingList[index - 1];
  };

  public getPreviousPostingMetadata = (
    category: string,
    title: string
  ): MarkdownMetadata | null => {
    const postingList = this.getPostingList(category);
    const index = postingList.findIndex((posting) => posting.title === title);
    if (index === postingList.length - 1) {
      return null;
    }

    return postingList[index + 1];
  };
}
