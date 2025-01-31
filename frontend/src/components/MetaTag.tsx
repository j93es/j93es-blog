// React

// External

// Local

const MetaTag = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  if (title) {
    document.title = title;

    document
      .querySelector('meta[name="apple-mobile-web-app-title"]')
      ?.setAttribute("content", title);

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
  }

  if (description) {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);

    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }

  return null;
};

export default MetaTag;
