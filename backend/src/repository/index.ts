import { TokenizedHtmlRepository } from "../core/repository/TokenizedHtml";
import { TokenizedHtmlRepo } from "./TokenizedHtml";

import { MarkdownMetadataRepository } from "../core/repository/markdownMetadata";
import { MarkdownMetadataRepo } from "./markdownMetadata";

export const tokenizedHtmlRepo: TokenizedHtmlRepository =
  new TokenizedHtmlRepo();

export const markdownMetadataRepo: MarkdownMetadataRepository =
  new MarkdownMetadataRepo();
