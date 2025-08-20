// React
import { useRef, useEffect, useState } from "react";

// External
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import urlJoin from "url-join";

// Local
import { apiUrl } from "config";
import { MarkdownMetadata } from "models/markdownMetadata";
import { usePostingIndexController } from "contexts/PostingIndexControllerProvider";
import useFetch from "customHooks/useFetch";
import CustomPre from "pages/body/Posting/components/CustomPre";
import CustomImage from "pages/body/Posting/components/CustomImage";
import CustomA from "pages/body/Posting/components/CustomA";
import CustomLi from "pages/body/Posting/components/CustomLi";
import MetaTag from "pages/body/components/MetaTag";
import { parseMarkdown } from "utils/index";
import "pages/body/Posting/Posting.css";

interface PostingProps {
  path: string;
}

const Posting: React.FC<PostingProps> = ({ path }) => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [currentPostingMetadata, setCurrentPostingMetadata] =
    useState<MarkdownMetadata | null>(null);
  const [nextPostingMetadata, setNextPostingMetadata] =
    useState<MarkdownMetadata | null>(null);
  const [previousPostingMetadata, setPreviousPostingMetadata] =
    useState<MarkdownMetadata | null>(null);

  const { postingIndexController } = usePostingIndexController();

  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);

  useFetch(urlJoin(apiUrl, path), "", [path, postingIndexController], {
    responseType: "text",
    callback: (data) => {
      if (!data) return;

      const { metadata, content } = parseMarkdown.get(data as string);

      setMarkdownContent(content);
      setCurrentPostingMetadata(metadata);
    },
  });

  useEffect(() => {
    if (!currentPostingMetadata || !postingIndexController) return;

    const nextPostingMetadata = postingIndexController.getNextPostingMetadata(
      currentPostingMetadata.category,
      currentPostingMetadata.title
    );
    const previousPostingMetadata =
      postingIndexController.getPreviousPostingMetadata(
        currentPostingMetadata.category,
        currentPostingMetadata.title
      );

    setNextPostingMetadata(nextPostingMetadata || null);
    setPreviousPostingMetadata(previousPostingMetadata || null);
  }, [currentPostingMetadata, postingIndexController]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setElementWidth(width);
      }
    });

    const element = elementRef.current;
    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, []);

  const components = useRef({
    code: ({ ...props }) => {
      return (
        <code
          style={{ borderRadius: "0.625rem", fontSize: "0.875rem" }}
          {...props}
        />
      );
    },
    img: ({ ...props }) => {
      return <CustomImage {...props} />;
    },
    pre: ({ ...props }) => {
      return <CustomPre elementWidth={elementWidth} {...props} />;
    },
    a: ({ ...props }) => {
      return <CustomA {...props} />;
    },
    li: ({ ...props }) => {
      return <CustomLi {...props} />;
    },
  });

  return (
    <div ref={elementRef} className="posting-wrap">
      {currentPostingMetadata && <MetaTag {...currentPostingMetadata} />}

      <div className="posting-head">
        <h1 className="posting-title">{currentPostingMetadata?.title}</h1>

        {currentPostingMetadata?.tag && (
          <p>{`Tag | ${currentPostingMetadata.tag.join(", ")}`}</p>
        )}
        {currentPostingMetadata?.date && (
          <p>{`Date | ${currentPostingMetadata.date}`}</p>
        )}
        {currentPostingMetadata?.description && (
          <p>{`Summary | ${currentPostingMetadata.description}`}</p>
        )}
      </div>
      <div className="posting-content">
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeSanitize, { ...defaultSchema }],
            rehypeHighlight,
          ]}
          components={{
            ...components.current,
            pre: (props) => (
              <components.current.pre elementWidth={elementWidth} {...props} />
            ),
          }}
        />
      </div>
      <div className="posting-nav">
        {previousPostingMetadata && (
          <Link
            to={previousPostingMetadata.path}
            className="posting-nav-item nav-prev"
            aria-label={`${previousPostingMetadata.title} 포스팅으로 이동`}
          >
            <span>&lsaquo; {previousPostingMetadata.title}</span>
          </Link>
        )}
        {nextPostingMetadata && (
          <Link
            to={nextPostingMetadata.path}
            className="posting-nav-item nav-next"
            aria-label={`${nextPostingMetadata.title} 포스팅으로 이동`}
          >
            <span>{nextPostingMetadata.title} &rsaquo;</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Posting;
