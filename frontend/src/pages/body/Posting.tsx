import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark-dimmed.css";

function Posting({ markdownContent }: { markdownContent: string }) {
  const components = {
    code: ({ ...props }) => {
      return <code style={{ borderRadius: "1rem" }} {...props} />;
    },
    img: ({ ...props }) => (
      <img style={{ maxWidth: "100%" }} {...props} alt="" />
    ),
  };

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "3rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={components}
        />
      </div>
    </div>
  );
}

export default Posting;
