export interface IndexHtmlRepository {
  get: () => Promise<string>;
  getSync: () => string;
}
