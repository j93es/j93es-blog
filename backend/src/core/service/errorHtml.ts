import { ErrorCode } from "../../models/error";

export interface ErrorHtmlService {
  get: (code: ErrorCode) => string;
}
