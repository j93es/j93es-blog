import { apiDir } from "../config";
import { PostingIndexService } from "../core/service/postingIndex";
import { PostingIndex } from "../models/postingIndex";
import { markdownMetadataRepo } from "../repository/index";
import { metadataListToPostingIndex } from "../adapters/index";
import { PostingIndexController } from "../controllers/index";

export class PostingIndexServ implements PostingIndexService {
  controller: PostingIndexController;

  constructor() {
    const metadataList = markdownMetadataRepo.getSync(apiDir, "/posting/");
    const postingIndex = metadataListToPostingIndex(metadataList);
    this.controller = new PostingIndexController(postingIndex);
  }

  get(): PostingIndex {
    return this.controller?.getPostingIndex() || {};
  }
}
