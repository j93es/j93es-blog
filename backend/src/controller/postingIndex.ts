import { PostingIndex, EachPostingMetadata } from "../model/postingIndex";

// PostingIndex를 받아서 PostingIndex를 정렬하고, PostingIndex를 반환하는 PostingIndexController 클래스
export class PostingIndexController {
  private postingIndex: PostingIndex;
  private categoryListCache: string[] | null;

  constructor(postingIndex: PostingIndex) {
    this.categoryListCache = null;
    this.postingIndex = JSON.parse(JSON.stringify(postingIndex));
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
    return JSON.parse(JSON.stringify(this.postingIndex));
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

    return JSON.parse(JSON.stringify(this.categoryListCache));
  };

  public getPostingList = (category: string): EachPostingMetadata[] | [] => {
    if (!this.postingIndex[category]) {
      return [];
    }

    return JSON.parse(JSON.stringify(this.postingIndex[category].data));
  };

  public getEachPostingMetadata = (
    category: string,
    target: string,
    by: keyof EachPostingMetadata
  ): EachPostingMetadata | null => {
    return (
      this.postingIndex[category].data.find(
        (posting) => posting[by] === target
      ) ?? null
    );
  };

  public getNextPostingMetadata = (
    category: string,
    title: string
  ): EachPostingMetadata | null => {
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
  ): EachPostingMetadata | null => {
    const postingList = this.getPostingList(category);
    const index = postingList.findIndex((posting) => posting.title === title);
    if (index === postingList.length - 1) {
      return null;
    }

    return postingList[index + 1];
  };
}
