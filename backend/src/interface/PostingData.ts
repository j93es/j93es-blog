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
