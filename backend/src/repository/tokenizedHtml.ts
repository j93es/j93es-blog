import fs from "fs";
import path from "path";
import { TemplateToken } from "../models/templateToken";
import { TokenizedHtmlRepository } from "../core/repository/tokenizedHtml";

export class TokenizedHtmlRepo implements TokenizedHtmlRepository {
  /**
   * 템플릿 문자열을 정규식을 사용해 static 토큰과 placeholder 토큰으로 분리합니다.
   * placeholder는 {{ ... }} 형태로 작성되어 있다고 가정합니다.
   * @param rawHtml 전체 템플릿 문자열
   */
  private makeTemplateTokens = (rawHtml: string) => {
    const tokens: TemplateToken[] = [];
    const regex = /\{\{(.*?)\}\}/g; // {{ 와 }} 사이의 내용을 placeholder로 인식
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(rawHtml)) !== null) {
      // placeholder 이전의 정적인 문자열 부분 추가
      if (match.index > lastIndex) {
        tokens.push({
          type: "static",
          value: rawHtml.substring(lastIndex, match.index),
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
    if (lastIndex < rawHtml.length) {
      tokens.push({
        type: "static",
        value: rawHtml.substring(lastIndex),
      });
    }

    return tokens;
  };

  async get(dir: string, fileName: string): Promise<TemplateToken[]> {
    const htmlPath = path.join(dir, fileName);

    let rawHtml = "";
    try {
      rawHtml = await fs.promises.readFile(htmlPath, "utf8");
    } catch (error) {
      console.error("Failed to read index.html file.");
    }

    return this.makeTemplateTokens(rawHtml);
  }

  getSync(dir: string, fileName: string): TemplateToken[] {
    const htmlPath = path.join(dir, fileName);

    let rawHtml = "";
    try {
      rawHtml = fs.readFileSync(htmlPath, "utf8");
    } catch (error) {
      console.error("Failed to read index.html file.");
    }

    return this.makeTemplateTokens(rawHtml);
  }
}
