export interface EachPostingMetadata {
  title: string;
  date: string;
  tag: string[];
  category: string;
  path: string;
}

export interface PostingCategory {
  order: number;
  data: EachPostingMetadata[];
}

export interface PostingIndex {
  [key: string]: PostingCategory;
}
