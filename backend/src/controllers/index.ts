import { PostingIndexController } from "./postingIndex";
import { FilesMetadataController } from "./filesMetadata";
import { IndexHtmlController } from "./indexHtml";
import { metadataListToPostingIndex } from "../adapters/metadataListToPostingIndex";

const fsPolicyMetadataController = new FilesMetadataController("/policy/");
const policyMetadataList = fsPolicyMetadataController.getMetadataList();

const fsPostingMetadataController = new FilesMetadataController("/posting/");
const postingMetadataList = fsPostingMetadataController.getMetadataList();
const postingindex = metadataListToPostingIndex(postingMetadataList);

const postingIndexController = new PostingIndexController(postingindex);
const indexHtmlController = new IndexHtmlController();

export { postingIndexController, indexHtmlController, policyMetadataList };
