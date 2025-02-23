// React
import { useState, useEffect } from "react";

// External

// Local
import { appDefaultTitle, appDefaultDescription } from "config";

let isInitialRender = true;

const MetaTagV2 = ({
  title,
  description,
  useDefault = false,
}: {
  title?: string;
  description?: string;
  useDefault?: boolean;
}) => {
  const [metaTitle, setMetaTitle] = useState<string | undefined>(undefined);
  const [metaDescription, setMetaDescription] = useState<string | undefined>(
    undefined
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
      metaTitle = appDefaultTitle;
      metaDescription = appDefaultDescription;
    }
    if (!useDefault && metaTitle) {
      metaTitle = `${metaTitle} - ${appDefaultTitle}`;
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

export default MetaTagV2;
