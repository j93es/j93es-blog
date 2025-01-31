// React
import { useState, useEffect } from "react";

// External

// Local
import { defaultTitle, defaultDescription } from "config";

let isInitialRender = true;

const MetaTag = ({
  title,
  description,
  useDefault = false,
}: {
  title?: string;
  description?: string;
  useDefault?: boolean;
}) => {
  const [metaTitle, setMetaTitle] = useState<string | undefined>(defaultTitle);
  const [metaDescription, setMetaDescription] = useState<string | undefined>(
    defaultDescription
  );

  useEffect(() => {
    if (!isInitialRender) {
      return;
    }
    try {
      document.querySelector("title")?.remove();
      document
        .querySelector('meta[name="apple-mobile-web-app-title"]')
        ?.remove();
      document.querySelector('meta[property="og:title"]')?.remove();
      document.querySelector('meta[name="description"]')?.remove();
      document.querySelector('meta[property="og:description"]')?.remove();
    } catch (e) {
    } finally {
      isInitialRender = false;
    }
  }, []);

  useEffect(() => {
    let metaTitle = title;
    let metaDescription = description;

    if (useDefault) {
      metaTitle = defaultTitle;
      metaDescription = defaultDescription;
    }
    if (!useDefault && metaTitle) {
      metaTitle = `${metaTitle} - ${defaultTitle}`;
    }

    if (metaTitle) setMetaTitle(metaTitle);
    if (metaDescription) setMetaDescription(metaDescription);
  }, [title, description, useDefault]);

  return (
    <article>
      {metaTitle && (
        <>
          <title>{metaTitle}</title>
          <meta name="apple-mobile-web-app-title" content={metaTitle} />
          <meta property="og:title" content={metaTitle} />
        </>
      )}

      {metaDescription && (
        <>
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
        </>
      )}
    </article>
  );
};

// const MetaTag = ({
//   title,
//   description,
//   useDefault = false,
// }: {
//   title?: string;
//   description?: string;
//   useDefault?: boolean;
// }) => {
//   if (useDefault) {
//     title = defaultTitle;
//     description = defaultDescription;
//   }

//   if (!useDefault && title) {
//     title = `${title} - ${defaultTitle}`;
//   }

//   if (title) {
//     document.title = title;

//     document
//       .querySelector('meta[name="apple-mobile-web-app-title"]')
//       ?.setAttribute("content", title);

//     document
//       .querySelector('meta[property="og:title"]')
//       ?.setAttribute("content", title);
//   }

//   if (description) {
//     document
//       .querySelector('meta[name="description"]')
//       ?.setAttribute("content", description);

//     document
//       .querySelector('meta[property="og:description"]')
//       ?.setAttribute("content", description);
//   }

//   return null;
// };

export default MetaTag;
