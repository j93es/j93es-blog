import {
  errorPageDir,
  appDefaultTitle,
  appDefaultDescription,
} from "../config";
import { TemplateToken } from "../models/templateToken";
import { ErrorCode } from "../models/error";
import { ErrorHtmlService } from "../core/service/errorHtml";
import { tokenizedHtmlRepo } from "../repository/index";

/* SEO를 위하여 index.html의 title, description 같은 항목을 요청의 path에 따라 동적으로 생성하여 반환하는 class이다. */
export class ErrorHtmlServ implements ErrorHtmlService {
  // 템플릿을 미리 파싱하여 토큰 배열로 저장
  private templateTokens: TemplateToken[] = [];
  // URL 별로 title, description 캐싱
  private templateData: Record<ErrorCode, [string, string]> = {
    400: ["Bad Request", "잘못된 요청입니다."],
    403: ["Forbidden", "접근이 금지되었습니다."],
    404: ["Page Not Found", "요청하신 페이지를 찾을 수 없습니다."],
    429: ["Too Many Requests", "요청이 너무 많습니다."],
    500: ["Internal Server Error", "서버에 문제가 발생했습니다."],
    1000: ["Frontend Error", "예기치 못한 오류가 발생했습니다."],
    1001: [
      "Frontend Promise Error",
      "비동기 처리에서 예기치 못한 오류가 발생했습니다.",
    ],
    1002: ["Frontend Network Error", "네트워크 오류가 발생했습니다."],
  };

  constructor() {
    this.templateTokens = tokenizedHtmlRepo.getSync(errorPageDir, "error.html");
  }

  /**
   * 주어진 URL 경로에 대해 최종 HTML 문자열을 생성합니다.
   * 템플릿 내에 등장하는 모든 placeholder를 동적 데이터로 치환합니다.
   * @param urlPath 요청 URL 경로
   * @returns 최종 HTML 문자열
   */
  get(code: ErrorCode): string {
    const data = this.templateData[code as keyof typeof this.templateData];

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
