import { MarkdownMetadata } from "models/markdownMetadata";

export interface PostingCategory {
  order: number;
  data: MarkdownMetadata[];
}

export interface PostingIndex {
  [key: string]: PostingCategory;
}
