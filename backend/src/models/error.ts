export type ServerErrorCode = 400 | 403 | 404 | 429 | 500;
export type FrontendErrorCode = 1000 | 1001 | 1002;
export type ErrorCode = ServerErrorCode | FrontendErrorCode;

export class NotFoundError implements Error {
  code: ServerErrorCode;
  name: string = "NotFoundError";

  constructor(public message: string) {
    this.code = 404;
    this.message = message ?? "Not Found Error";
  }
}

export class ForbiddenError implements Error {
  code: ServerErrorCode;
  name: string = "ForbbidenError";

  constructor(public message: string) {
    this.code = 403;
    this.message = message ?? "Forbbiden Error";
  }
}

export class TooManyRequestsError implements Error {
  code: ServerErrorCode;
  name: string = "TooManyRequestsError";

  constructor(public message: string) {
    this.code = 429;
    this.message = message ?? "Too Many Requests Error";
  }
}

export class BadRequestError implements Error {
  code: ServerErrorCode;
  name: string = "BadRequestError";

  constructor(public message: string) {
    this.code = 400;
    this.message = message ?? "Bad Request Error";
  }
}

export class FrontendErrorBoundaryError implements Error {
  code: FrontendErrorCode;
  name: string = "FrontendErrorBoundaryError";

  constructor(public message: string) {
    this.code = 1000;
    this.message = message ?? "Frontend Error Boundary Error";
  }
}

export class FrontendGlobalError implements Error {
  code: FrontendErrorCode;
  name: string = "FrontendGlobalError";

  constructor(public message: string) {
    this.code = 1001;
    this.message = message ?? "Frontend Global Error";
  }
}

export class FrontendFetchError implements Error {
  code: FrontendErrorCode;
  name: string = "FrontendFetchError";

  constructor(public message: string) {
    this.code = 1002;
    this.message = message ?? "Frontend Fetch Error";
  }
}
