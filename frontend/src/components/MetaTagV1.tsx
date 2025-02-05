// React

// External

// Local
import { defaultTitle, defaultDescription } from "config";

const MetaTagV1 = ({
  title,
  description,
  useDefault = false,
}: {
  title?: string;
  description?: string;
  useDefault?: boolean;
}) => {
  if (useDefault) {
    title = defaultTitle;
    description = defaultDescription;
  }

  if (!useDefault && title) {
    title = `${title} - ${defaultTitle}`;
  }

  if (title) {
    document.title = title;
    document
      .querySelector('meta[name="apple-mobile-web-app-title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", title);
  }

  if (description) {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", description);
  }

  return null;
};

export default MetaTagV1;
