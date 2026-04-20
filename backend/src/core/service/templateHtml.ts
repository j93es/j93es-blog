export interface TemplateHtmlService {
  get: (
    dir: string,
    fileName: string,
    templateData: { [key: string]: string }
  ) => Promise<string>;

  getSync: (
    dir: string,
    fileName: string,
    templateData: { [key: string]: string }
  ) => string;
}
