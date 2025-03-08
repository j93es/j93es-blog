import { showingCategoryList } from "../config";
import { PostingIndex } from "../models/postingIndex";
import { MarkdownMetadata } from "../models/markdownMetadata";
import { deepCopy } from "../utils";

const metadataListToPostingIndex = (
  metadataList: MarkdownMetadata[]
): PostingIndex => {
  const postingIndex: PostingIndex = {};

  showingCategoryList.forEach((category: string, index: number) => {
    postingIndex[category] = { order: index, data: [] };
  });

  deepCopy(metadataList).forEach((metadata) => {
    if (!showingCategoryList.includes(metadata.category)) {
      return;
    }
    postingIndex[metadata.category].data.push(metadata);
  });

  Object.keys(postingIndex).forEach((key) => {
    if (postingIndex[key].data.length === 0) {
      delete postingIndex[key];
    }
  });

  return postingIndex;
};

export { metadataListToPostingIndex };
