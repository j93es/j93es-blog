import { errorRedirect } from "utils/errorRedirect";
import { getBrowser } from "utils/getBrowser";
import { makeTitleDescription } from "utils/makeTitleDescription";
import { ParseMarkdown } from "utils/parseMarkdown";

const parseMarkdown = new ParseMarkdown();

export { errorRedirect, getBrowser, parseMarkdown, makeTitleDescription };
