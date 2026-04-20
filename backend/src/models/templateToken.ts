// 각 토큰은 static 문자열이거나 placeholder 이름을 가집니다.
export interface TemplateToken {
  type: "static" | "placeholder";
  value: string;
}
