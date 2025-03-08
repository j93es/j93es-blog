import { IndexHtmlRepository } from "../core/repository/indexHtml";
import { IndexHtmlRepo } from "./indexHtml";

import { MarkdownMetadataRepository } from "../core/repository/markdownMetadata";
import { MarkdownMetadataRepo } from "./markdownMetadata";

export const indexHtmlRepo: IndexHtmlRepository = new IndexHtmlRepo();

export const markdownMetadataRepo: MarkdownMetadataRepository =
  new MarkdownMetadataRepo();
