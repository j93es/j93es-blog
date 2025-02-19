import { showingCategoryList } from "../config";
import { PostingIndex } from "../models/postingIndex";
import { EachPostingMetadata } from "../models/postingIndex";

const metadataListToPostingIndex = (
  metadataList: EachPostingMetadata[]
): PostingIndex => {
  const postingIndex: PostingIndex = {};

  showingCategoryList.forEach((category: string, index: number) => {
    postingIndex[category] = { order: index, data: [] };
  });

  metadataList.forEach((metadata) => {
    if (!showingCategoryList.includes(metadata.category)) {
      return;
    }
    postingIndex[metadata.category].data.push({
      title: metadata.title,
      date: metadata.date,
      tag: metadata.tag,
      category: metadata.category,
      description: metadata.description,
      path: metadata.path,
    });
  });

  Object.keys(postingIndex).forEach((key) => {
    if (postingIndex[key].data.length === 0) {
      delete postingIndex[key];
    }
  });

  return postingIndex;
};

export { metadataListToPostingIndex };
