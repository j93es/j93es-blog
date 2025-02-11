// React

// External

// Local
import { makeTitleDescription } from "utils/index";

const MetaTagV1 = ({
  title,
  tag,
  useDefault = false,
}: {
  title?: string;
  tag?: string[];
  useDefault?: boolean;
}) => {
  const [finalTitle, description] = makeTitleDescription({
    title,
    tag,
    useDefault,
  });

  document.title = finalTitle;
  document
    .querySelector('meta[name="apple-mobile-web-app-title"]')
    ?.setAttribute("content", finalTitle);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", finalTitle);
  document
    .querySelector('meta[name="twitter:title"]')
    ?.setAttribute("content", finalTitle);

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[name="twitter:description"]')
    ?.setAttribute("content", description);

  return null;
};

export default MetaTagV1;
