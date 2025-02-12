import { defaultTitle, defaultDescription } from "../config";

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
    if (useDefault) return defaultTitle;
    if (!title) return defaultTitle;
    return `${title} - ${defaultTitle}`;
  };

  const getDescription = () => {
    if (useDefault) return defaultDescription;
    if (!description) return defaultDescription;
    return description;
  };

  return [getTitle(), getDescription()];
};

export { makeTitleDescription };
