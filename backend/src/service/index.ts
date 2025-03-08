import { PostingIndexService } from "../core/service/postingIndex";
import { PostingIndexServ } from "./postingIndex";

import { IndexHtmlService } from "../core/service/indexHtml";
import { IndexHtmlServ } from "./indexHtml";

export const postingIndexServ: PostingIndexService = new PostingIndexServ();

// indexHtmlServ는 postingIndexServ에 의존함
export const indexHtmlServ: IndexHtmlService = new IndexHtmlServ();
