import { TokenizedHtmlRepository } from "../core/repository/tokenizedHtml";
import { TokenizedHtmlRepo } from "./tokenizedHtml";

import { MarkdownMetadataRepository } from "../core/repository/markdownMetadata";
import { MarkdownMetadataRepo } from "./markdownMetadata";

export const tokenizedHtmlRepo: TokenizedHtmlRepository =
  new TokenizedHtmlRepo();

export const markdownMetadataRepo: MarkdownMetadataRepository =
  new MarkdownMetadataRepo();
