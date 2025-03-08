import { PostingIndexController } from "controllers";
import { PostingIndex } from "../../models/postingIndex";

export interface PostingIndexService {
  controller: PostingIndexController | null;
  get: () => PostingIndex;
}
