import { nanoid } from "nanoid";

export class NanoidGenerator {
  generateId(length: number = 8) {
    return nanoid(length);
  }
}
