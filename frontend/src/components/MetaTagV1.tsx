// React

// External

// Local
import { makeTitleDescription } from "utils/index";

const MetaTagV1 = ({
  title,
  description,
  useDefault = false,
}: {
  title?: string;
  description?: string;
  useDefault?: boolean;
}) => {
  const [newTitle, newDescription] = makeTitleDescription({
    title,
    description,
    useDefault,
  });

  document.title = newTitle;
  document
    .querySelector('meta[name="apple-mobile-web-app-title"]')
    ?.setAttribute("content", newTitle);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", newTitle);
  document
    .querySelector('meta[name="twitter:title"]')
    ?.setAttribute("content", newTitle);

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", newDescription);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", newDescription);
  document
    .querySelector('meta[name="twitter:description"]')
    ?.setAttribute("content", newDescription);

  return null;
};

export default MetaTagV1;
