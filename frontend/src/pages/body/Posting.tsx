import { Link } from "react-router-dom";
import { PostingDataContext } from "App";
import { useContext } from "react";
import { parseMarkdown } from "utils/parse-markdown";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark-dimmed.css";
import "pages/body/Posting.css";

function Posting({ markdownContent }: { markdownContent: string }) {
  const components = {
    code: ({ ...props }) => {
      return <code style={{ borderRadius: "0.625rem" }} {...props} />;
    },
    img: ({ ...props }) => (
      <img style={{ maxWidth: "100%" }} loading="lazy" {...props} alt="" />
    ),
  };

  const postingData = useContext(PostingDataContext);
  const { data, content } = parseMarkdown(markdownContent);
  const nextPosting =
    postingData && postingData.getNextPosting(data.category, data.title);
  const previousPosting =
    postingData && postingData.getPreviousPosting(data.category, data.title);

  return (
    <div className="posting-wrap">
      <div>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={components}
        />
      </div>
      <div>
        {previousPosting && (
          <Link to={previousPosting.path} className="posting-nav-item prev">
            <span>&lsaquo; {previousPosting.title}</span>
          </Link>
        )}
        {nextPosting && (
          <Link to={nextPosting.path} className="posting-nav-item next">
            <span>{nextPosting.title} &rsaquo;</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Posting;
