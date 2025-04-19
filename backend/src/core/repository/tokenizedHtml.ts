import { TemplateToken } from "../../models/templateToken";

export interface TokenizedHtmlRepository {
  get: (dir: string, fileName: string) => Promise<TemplateToken[]>;
  getSync: (dir: string, fileName: string) => TemplateToken[];
}
