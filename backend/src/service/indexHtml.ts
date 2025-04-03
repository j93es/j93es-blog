import path from "path";

import {
  rootDir,
  apiDir,
  appDefaultTitle,
  appDefaultDescription,
} from "../config";
import { TemplateToken } from "../models/templateToken";
import { IndexHtmlService } from "../core/service/indexHtml";
import { tokenizedHtmlRepo, markdownMetadataRepo } from "../repository/index";
import { postingIndexServ } from "./index";
import { makeTitleDescription } from "../utils/index";

/* SEO를 위하여 index.html의 title, description 같은 항목을 요청의 path에 따라 동적으로 생성하여 반환하는 class이다. */
export class IndexHtmlServ implements IndexHtmlService {
  // 템플릿을 미리 파싱하여 토큰 배열로 저장
  private templateTokens: TemplateToken[] = [];
  // URL 별로 title, description 캐싱
  private templateData: { [key: string]: [string, string] } = {}; // { [key: url path]: [title, description] }

  constructor() {
    this.templateTokens = tokenizedHtmlRepo.getSync(rootDir, "index.html");
    this.templateData = this.makeTokenVlaue();
  }

  private makeTokenVlaue = () => {
    const templateData: { [key: string]: [string, string] } = {};

    // 루트 경로에는 기본 값 사용
    templateData["/"] = makeTitleDescription({ useDefault: true });

    // 각 posting path 별로 token의 value를 만들어 저장
    postingIndexServ.controller
      ?.getCategoryList()
      .forEach((category: string) => {
        const postingList =
          postingIndexServ.controller?.getPostingList(category);
        postingList?.forEach((posting) => {
          templateData[posting.path] = makeTitleDescription({
            ...posting,
          });
        });
      });

    const policyMetadataList = markdownMetadataRepo.getSync(apiDir, "/policy/");
    // 각 policy path 별로 token의 value를 만들어 저장
    policyMetadataList.forEach((metadata) => {
      templateData[metadata.path] = makeTitleDescription({
        ...metadata,
      });
    });

    return templateData;
  };

  /**
   * 주어진 URL 경로에 대해 최종 HTML 문자열을 생성합니다.
   * 템플릿 내에 등장하는 모든 placeholder를 동적 데이터로 치환합니다.
   * @param urlPath 요청 URL 경로
   * @returns 최종 HTML 문자열
   */
  get(urlPath: string): string {
    // URL에 해당하는 동적 데이터 [title, description] 가져오기
    urlPath = path.join("/", urlPath);
    urlPath = path.normalize(urlPath);

    const data = this.templateData[urlPath];

    // 동적 데이터를 객체 형태로 매핑 (필요에 따라 다른 placeholder도 추가 가능)
    const dynamicMapping: { [key: string]: string } = {
      title: data ? data[0] || appDefaultTitle : appDefaultTitle,
      description: data
        ? data[1] || appDefaultDescription
        : appDefaultDescription,
    };

    let finalHtml = "";
    // 미리 분리된 토큰 배열을 순회하며 최종 HTML 생성
    for (const token of this.templateTokens) {
      if (token.type === "static") {
        finalHtml += token.value;
      } else if (token.type === "placeholder") {
        // 동일한 placeholder가 여러 번 등장해도 모두 dynamicMapping의 값으로 대체됨
        finalHtml += dynamicMapping[token.value] ?? "";
      }
    }
    return finalHtml;
  }
}
