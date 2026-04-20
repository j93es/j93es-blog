import { appDefaultTitle, appDefaultDescription } from "../config";

const makeTitleDescription = ({
  title,
  description,
  useDefault = false,
}: {
  title?: string;
  description?: string;
  useDefault?: boolean;
}): { title: string; description: string } => {
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

  return { title: getTitle(), description: getDescription() };
};

export { makeTitleDescription };
