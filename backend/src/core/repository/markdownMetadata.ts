import { MarkdownMetadata } from "../../models/markdownMetadata";

export interface MarkdownMetadataRepository {
  get: (baseDir: string, targetDir: string) => Promise<MarkdownMetadata[]>;
  getSync: (baseDir: string, targetDir: string) => MarkdownMetadata[];
}
