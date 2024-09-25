export class NotFoundError implements Error {
  name: string = "NotFoundError";

  constructor(public message: string) {
    this.message = message ?? "Not Found Error";
  }
}

export class ForbbidenError implements Error {
  name: string = "ForbbidenError";

  constructor(public message: string) {
    this.message = message ?? "Forbbiden Error";
  }
}

export class TooManyRequestsError implements Error {
  name: string = "TooManyRequestsError";

  constructor(public message: string) {
    this.message = message ?? "Too Many Requests Error";
  }
}

export class BadRequestError implements Error {
  name: string = "BadRequestError";

  constructor(public message: string) {
    this.message = message ?? "Bad Request Error";
  }
}
