import fs from "fs";
import path from "path";
import { frontendDir, appDefaultTitle, appDefaultDescription } from "../config";
import {
  postingIndexController,
  policyMetadataList,
} from "../controllers/index";
import { makeTitleDescription, parseMarkdown } from "../utils/index";

// 각 토큰은 static 문자열이거나 placeholder 이름을 가집니다.
interface TemplateToken {
  type: "static" | "placeholder";
  value: string;
}

/* SEO를 위하여 index.html의 title, description 같은 항목을 요청의 path에 따라 동적으로 생성하여 반환하는 class이다. */
export class IndexHtmlController {
  // 템플릿을 미리 파싱하여 토큰 배열로 저장
  private templateTokens: TemplateToken[] = [];
  // URL 별로 title, description 캐싱
  private titleDescription: { [key: string]: [string, string] } = {};

  constructor() {
    this.makeTemplateTokens();
    this.makeTokenVlaue();
  }

  private makeTemplateTokens() {
    const indexHtmlPath = path.join(frontendDir, "index.html");
    let rawHtml = "";
    try {
      rawHtml = fs.readFileSync(indexHtmlPath, "utf8");
    } catch (error) {
      console.error("Failed to read index.html file.");
    }
    // 템플릿을 파싱하여 토큰 배열 생성 (placeholder가 여러 개여도 모두 기록됨)
    this.templateTokens = this.parseTemplate(rawHtml);
  }

  private makeTokenVlaue() {
    // 루트 경로에는 기본 값 사용
    this.titleDescription["/"] = makeTitleDescription({ useDefault: true });

    // 각 posting path 별로 token의 value를 만들어 저장
    postingIndexController.getCategoryList().forEach((category: string) => {
      const postingList = postingIndexController.getPostingList(category);
      postingList.forEach((posting) => {
        this.titleDescription[posting.path] = makeTitleDescription({
          ...posting,
        });
      });
    });

    // 각 policy path 별로 token의 value를 만들어 저장
    policyMetadataList.forEach((metadata) => {
      this.titleDescription[metadata.path] = makeTitleDescription({
        ...metadata,
      });
    });
  }

  /**
   * 템플릿 문자열을 정규식을 사용해 static 토큰과 placeholder 토큰으로 분리합니다.
   * placeholder는 {{ ... }} 형태로 작성되어 있다고 가정합니다.
   * @param templateStr 전체 템플릿 문자열
   * @returns 토큰 배열
   */
  private parseTemplate(templateStr: string): TemplateToken[] {
    const tokens: TemplateToken[] = [];
    const regex = /\{\{(.*?)\}\}/g; // {{ 와 }} 사이의 내용을 placeholder로 인식
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(templateStr)) !== null) {
      // placeholder 이전의 정적인 문자열 부분 추가
      if (match.index > lastIndex) {
        tokens.push({
          type: "static",
          value: templateStr.substring(lastIndex, match.index),
        });
      }
      // placeholder 토큰 추가 (양쪽 공백 제거)
      tokens.push({
        type: "placeholder",
        value: match[1].trim(),
      });
      lastIndex = regex.lastIndex;
    }
    // 마지막 남은 정적 문자열 부분 추가
    if (lastIndex < templateStr.length) {
      tokens.push({
        type: "static",
        value: templateStr.substring(lastIndex),
      });
    }
    return tokens;
  }

  /**
   * 주어진 URL 경로에 대해 최종 HTML 문자열을 생성합니다.
   * 템플릿 내에 등장하는 모든 placeholder를 동적 데이터로 치환합니다.
   * @param urlPath 요청 URL 경로
   * @returns 최종 HTML 문자열
   */
  getIndexHtml(urlPath: string): string {
    // URL에 해당하는 동적 데이터 [title, description] 가져오기
    urlPath = path.join("/", urlPath);
    urlPath = path.normalize(urlPath);

    const td = this.titleDescription[urlPath];

    // 동적 데이터를 객체 형태로 매핑 (필요에 따라 다른 placeholder도 추가 가능)
    const dynamicMapping: { [key: string]: string } = {
      title: td ? td[0] || appDefaultTitle : appDefaultTitle,
      description: td ? td[1] || appDefaultDescription : appDefaultDescription,
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
