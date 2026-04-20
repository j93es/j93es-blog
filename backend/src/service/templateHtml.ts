import { tokenizedHtmlRepo } from "../repository/index";
import { TemplateHtmlService } from "../core/service/templateHtml";

/* SEO를 위하여 index.html의 title, description 같은 항목을 요청의 path에 따라 동적으로 생성하여 반환하는 class이다. */
export class TemplateHtmlServ implements TemplateHtmlService {
  async get(
    dir: string,
    fileName: string,
    templateData: { [key: string]: string }
  ): Promise<string> {
    const templateTokens = await tokenizedHtmlRepo.get(dir, fileName);

    let finalHtml = "";
    // 미리 분리된 토큰 배열을 순회하며 최종 HTML 생성
    for (const token of templateTokens) {
      if (token.type === "static") {
        finalHtml += token.value;
      } else if (token.type === "placeholder") {
        // 동일한 placeholder가 여러 번 등장해도 모두 dynamicMapping의 값으로 대체됨
        finalHtml += templateData[token.value] ?? "";
      }
    }
    return finalHtml;
  }

  getSync(
    dir: string,
    fileName: string,
    templateData: { [key: string]: string }
  ): string {
    const templateTokens = tokenizedHtmlRepo.getSync(dir, fileName);

    let finalHtml = "";
    // 미리 분리된 토큰 배열을 순회하며 최종 HTML 생성
    for (const token of templateTokens) {
      if (token.type === "static") {
        finalHtml += token.value;
      } else if (token.type === "placeholder") {
        // 동일한 placeholder가 여러 번 등장해도 모두 dynamicMapping의 값으로 대체됨
        finalHtml += templateData[token.value] ?? "";
      }
    }
    return finalHtml;
  }
}
