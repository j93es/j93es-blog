import { errorRedirect } from "utils/errorRedirect";
import { isSafari } from "./isSafari";
import { makeTitleDescription } from "utils/makeTitleDescription";
import { ParseMarkdown } from "utils/parseMarkdown";

const parseMarkdown = new ParseMarkdown();

export { errorRedirect, isSafari, parseMarkdown, makeTitleDescription };
