import { defaultTitle, defaultDescription } from "config";

const makeTitleDescription = ({
  title,
  tag,
  useDefault = false,
}: {
  title?: string;
  tag?: string[];
  useDefault: boolean;
}): [string, string] => {
  const getTitle = () => {
    if (useDefault) return defaultTitle;
    if (!title) return defaultTitle;
    return `${title} - ${defaultTitle}`;
  };

  const getDescription = () => {
    if (useDefault) return defaultDescription;
    let desc = "j93es 블로그의 포스팅입니다. ";
    if (tag) desc += `${tag.join(", ")}와(과) 관련한 내용을 담고 있습니다! `;

    return desc.trim();
  };

  return [getTitle(), getDescription()];
};

export { makeTitleDescription };
