import { PostingIndexService } from "../core/service/postingIndex";
import { PostingIndexServ } from "./postingIndex";

import { TemplateHtmlService } from "../core/service/templateHtml";
import { TemplateHtmlServ } from "./templateHtml";

export const postingIndexServ: PostingIndexService = new PostingIndexServ();
export const templateHtmlServ: TemplateHtmlService = new TemplateHtmlServ();
