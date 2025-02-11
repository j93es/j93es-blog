import { PostingIndexController } from "./postingIndex";
import { FilesMetadataController } from "./filesMetadata";
import { IndexHtmlController } from "./indexHtml";

const postingMetadata = new FilesMetadataController("/posting/");
const postingIndexController = new PostingIndexController(
  postingMetadata.getMarkdownFilesMetadata()
);
const indexHtmlController = new IndexHtmlController();

export {
  postingMetadata,
  postingIndexController,
  indexHtmlController,
  PostingIndexController,
};
