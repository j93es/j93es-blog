// React
import { useRef, useEffect, useState } from "react";

// External
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import urlJoin from "url-join";
import "highlight.js/styles/github-dark-dimmed.css";

// Local
import { apiUrl } from "config";
import { EachPostingMetadata } from "models/postingIndex";
import { usePostingIndexController } from "contexts/PostingIndexControllerProvider";
import useFetch from "customHooks/useFetch";
import CustomPre from "pages/body/Posting/components/CustomPre";
import CustomImage from "pages/body/Posting/components/CustomImage";
import MetaTag from "pages/body/components/MetaTag";
import { parseMarkdown } from "utils/index";
import "pages/body/Posting/Posting.css";

interface PostingProps {
  path: string;
}

const Posting: React.FC<PostingProps> = ({ path }) => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [currentPosting, setCurrentPosting] =
    useState<EachPostingMetadata | null>(null);
  const [nextPosting, setNextPosting] = useState<EachPostingMetadata | null>(
    null
  );
  const [previousPosting, setPreviousPosting] =
    useState<EachPostingMetadata | null>(null);

  const { postingIndexController } = usePostingIndexController();

  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);

  const { data: markdownText } = useFetch(
    urlJoin(apiUrl, path),
    "",
    [path, postingIndexController],
    { responseType: "text" }
  );

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

  useEffect(() => {
    if (!markdownText || !postingIndexController) return;

    const { data, content } = parseMarkdown.get(markdownText);
    const currentPosting = { ...data } as EachPostingMetadata;
    const nextPosting = postingIndexController.getNextPostingMetadata(
      data.category,
      data.title
    );
    const previousPosting = postingIndexController.getPreviousPostingMetadata(
      data.category,
      data.title
    );

    setMarkdownContent(content);
    setCurrentPosting(currentPosting);
    setNextPosting(nextPosting || null);
    setPreviousPosting(previousPosting || null);
  }, [markdownText, postingIndexController]);

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
  });

  return (
    <div ref={elementRef} className="posting-wrap">
      {currentPosting && <MetaTag {...currentPosting} />}

      <div className="posting-head">
        <h1 className="posting-title">{currentPosting?.title}</h1>

        {currentPosting?.tag && (
          <p>{`Tag | ${currentPosting.tag.join(", ")}`}</p>
        )}
        {currentPosting?.date && <p>{`Date | ${currentPosting.date}`}</p>}
        {currentPosting?.description && (
          <p>{`Summary | ${currentPosting.description}`}</p>
        )}
      </div>
      <div className="posting-content">
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            ...components.current,
            pre: (props) => (
              <components.current.pre elementWidth={elementWidth} {...props} />
            ),
          }}
        />
      </div>
      <div className="posting-nav">
        {previousPosting && (
          <Link
            to={previousPosting.path}
            className="posting-nav-item nav-prev"
            aria-label={`${previousPosting.title} 포스팅으로 이동`}
          >
            <span>&lsaquo; {previousPosting.title}</span>
          </Link>
        )}
        {nextPosting && (
          <Link
            to={nextPosting.path}
            className="posting-nav-item nav-next"
            aria-label={`${nextPosting.title} 포스팅으로 이동`}
          >
            <span>{nextPosting.title} &rsaquo;</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Posting;
