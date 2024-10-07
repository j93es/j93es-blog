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
      <img style={{ maxWidth: "100%" }} {...props} alt="" />
    ),
  };

  return (
    <div className="posting-wrap">
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      />
    </div>
  );
}

export default Posting;
