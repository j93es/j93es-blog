import { PostingIndexController } from "./postingIndex";
import { FilesMetadataController } from "./filesMetadata";
import { IndexHtmlController } from "./indexHtml";

const filesMetadataController = new FilesMetadataController("/posting/");
const postingMetadata = filesMetadataController.getMarkdownFilesMetadata();

const postingIndexController = new PostingIndexController(postingMetadata);
const indexHtmlController = new IndexHtmlController();

export { postingIndexController, indexHtmlController };
