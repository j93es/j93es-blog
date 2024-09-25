import { useEffect, useState } from "react";
import { apiUrl } from "config/app-config";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold as syntaxHighlighterStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

function Posting({ path }: { path: string }) {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (!path || path === "/") {
      return;
    }
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(apiUrl + path);
        if (!response.ok) {
          throw new Error("Failed to fetch markdown");
        }
        const markdownText = await response.text();
        setMarkdownContent(markdownText.split("---")[2]);
      } catch (error) {
        console.error("Failed to fetch markdown", error);
      }
    };

    fetchMarkdown();
  }, [path]);

  const components = {
    code(props: any) {
      const { children, className, node, ...rest } = props;
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={syntaxHighlighterStyle}
        />
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
    img: ({ ...props }) => (
      <img style={{ maxWidth: "100%" }} {...props} alt="" />
    ),
  };
  console.log(markdownContent);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[rehypeHighlight, remarkGfm]}
          components={components}
        />
      </div>
    </div>
  );
}

export default Posting;
