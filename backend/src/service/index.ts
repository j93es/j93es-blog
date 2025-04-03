import { PostingIndexService } from "../core/service/postingIndex";
import { PostingIndexServ } from "./postingIndex";

import { IndexHtmlService } from "../core/service/indexHtml";
import { IndexHtmlServ } from "./indexHtml";

import { ErrorHtmlService } from "../core/service/errorHtml";
import { ErrorHtmlServ } from "./errorHtml";

export const postingIndexServ: PostingIndexService = new PostingIndexServ();

// TokenizedHtmlServ는 postingIndexServ에 의존함
export const indexHtmlServ: IndexHtmlService = new IndexHtmlServ();

export const errorHtmlServ: ErrorHtmlService = new ErrorHtmlServ();
