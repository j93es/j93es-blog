import { deepCopy } from "./deepCopy";
import { NanoidGenerator } from "./nanoid";
import { ParseMarkdown } from "./parseMarkdown";
import { makeTitleDescription } from "./makeTitleDescription";

export const nanoidGenerator = new NanoidGenerator();
export const parseMarkdown = new ParseMarkdown();
export { deepCopy, makeTitleDescription };
