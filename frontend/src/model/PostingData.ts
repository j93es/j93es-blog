export interface EachPosting {
  title: string;
  date: string;
  tag: string[];
  category: string;
  path: string;
}

export interface PostingCategory {
  order: number;
  data: EachPosting[];
}

export interface PostingData {
  [key: string]: PostingCategory;
}

export class PostingDataClass {
  private postingData: PostingData | null;

  constructor(postingData: PostingData | null) {
    if (!postingData) {
      this.postingData = null;
      return;
    }
    this.postingData = JSON.parse(JSON.stringify(postingData));
  }

  public getPostingData = () => {
    return this.postingData;
  };

  public getCategoryList = () => {
    if (!this.postingData) {
      return [];
    }

    return Object.keys(this.postingData).sort((a, b) => {
      if (!this.postingData) {
        return 0;
      }
      return this.postingData[a].order - this.postingData[b].order;
    });
  };

  public getPostingList = (category: string) => {
    if (!this.postingData) {
      return [];
    }

    return this.postingData[category].data;
  };

  public getEachPosting = (
    category: string,
    target: string,
    by: keyof EachPosting
  ) => {
    if (!this.postingData) {
      return null;
    }

    return this.postingData[category].data.find(
      (posting) => posting[by] === target
    );
  };

  public getNextPosting = (category: string, title: string) => {
    const postingList = this.getPostingList(category);
    const index = postingList.findIndex((posting) => posting.title === title);
    if (index === 0) {
      return null;
    }

    return postingList[index - 1];
  };

  public getPreviousPosting = (category: string, title: string) => {
    const postingList = this.getPostingList(category);
    const index = postingList.findIndex((posting) => posting.title === title);
    if (index === postingList.length - 1) {
      return null;
    }

    return postingList[index + 1];
  };

  public sortPostingData = () => {
    if (!this.postingData) {
      return null;
    }

    this.getCategoryList().map((key) => {
      return this.getPostingList(key).sort((a, b) => {
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

    return this.postingData;
  };
}
