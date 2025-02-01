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
    try {
      document.title = title;
    } catch (error) {}

    try {
      document
        ?.querySelector('meta[name="apple-mobile-web-app-title"]')
        ?.setAttribute("content", title);
      document
        ?.querySelector('meta[property="og:title"]')
        ?.setAttribute("content", title);
    } catch (error) {}
  }

  if (description) {
    try {
      document
        ?.querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
      document
        ?.querySelector('meta[property="og:description"]')
        ?.setAttribute("content", description);
    } catch (error) {}
  }

  return null;
};

export default MetaTagV1;
