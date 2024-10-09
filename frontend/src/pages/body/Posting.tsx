import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark-dimmed.css";
import "pages/body/Posting.css";
import { EachPosting } from "module/PostingData";
import { Link } from "react-router-dom";
import { PostingDataContext } from "App";
import { useContext } from "react";

function Posting({
  markdownContent,
  eachPosting = null,
}: {
  markdownContent: string;
  eachPosting?: EachPosting | null;
}) {
  const components = {
    code: ({ ...props }) => {
      return <code style={{ borderRadius: "0.625rem" }} {...props} />;
    },
    img: ({ ...props }) => (
      <img style={{ maxWidth: "100%" }} loading="lazy" {...props} alt="" />
    ),
  };
  const postingData = useContext(PostingDataContext);
  const nextPosting =
    postingData &&
    eachPosting &&
    postingData.getNextPosting(eachPosting.category, eachPosting.title);
  const previousPosting =
    postingData &&
    eachPosting &&
    postingData.getPreviousPosting(eachPosting.category, eachPosting.title);

  return (
    <div className="posting-wrap">
      <div className="posting-markdown-wrap">
        <ReactMarkdown
          children={markdownContent.split("---")[2]}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={components}
        />
      </div>
      <div className="posting-nav-wrap">
        {nextPosting && (
          <Link to={nextPosting.path} className="posting-nav-item">
            다음 글: {nextPosting.title}
          </Link>
        )}
        {previousPosting && (
          <Link to={previousPosting.path} className="posting-nav-item">
            이전 글: {previousPosting.title}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Posting;
