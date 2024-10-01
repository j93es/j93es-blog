import { useContext, useEffect, useState } from "react";
import { apiUrl } from "config/app-config";
import { bodyLoadingContext, setBodyLoadingContext } from "App";
import Loader from "pages/body/Loader";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold as syntaxHighlighterStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

function Posting({ path }: { path: string }) {
  const [markdownContent, setMarkdownContent] = useState("");
  const loading = useContext(bodyLoadingContext);
  const setBodyLoading = useContext(setBodyLoadingContext);

  useEffect(() => {
    if (!path || path === "/") {
      return;
    }
    const fetchMarkdown = async () => {
      try {
        setBodyLoading(true);
        const response = await fetch(apiUrl + path);
        if (!response.ok) {
          throw new Error("Failed to fetch markdown");
        }
        const markdownText = await response.text();
        setMarkdownContent(markdownText.split("---")[2]);
        setBodyLoading(false);
      } catch (error) {
        console.error("Failed to fetch markdown", error);
      }
    };

    fetchMarkdown();

    return () => {
      setMarkdownContent("");
    };

    // eslint-disable-next-line
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

  const postingJsx = (
    <div style={{ width: "90%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[rehypeHighlight, remarkGfm]}
          components={components}
        />
      </div>
    </div>
  );

  return <>{loading ? <Loader /> : postingJsx}</>;
}

export default Posting;
