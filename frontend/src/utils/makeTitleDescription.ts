// External

// Local

import { appDefaultTitle, appDefaultDescription } from "../config";

const makeTitleDescription = ({
  title,
  description,
  useDefault = false,
}: {
  title?: string;
  description?: string;
  useDefault?: boolean;
}): [string, string] => {
  const getTitle = () => {
    if (useDefault) return appDefaultTitle;
    if (!title) return appDefaultTitle;
    return `${title} - ${appDefaultTitle}`;
  };

  const getDescription = () => {
    if (useDefault) return appDefaultDescription;
    if (!description) return appDefaultDescription;
    return description;
  };

  return [getTitle(), getDescription()];
};

export { makeTitleDescription };
