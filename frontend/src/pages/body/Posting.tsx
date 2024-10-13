// React
import { useRef, useContext, useEffect, useState, useMemo, memo } from "react";

// Local
import { apiUrl } from "config";
import { EachPosting } from "model/posting-data";
import { parseMarkdown } from "utils/parse-markdown";
import { SetAlertDataContext, PostingDataContext } from "App";
import Loader from "components/Loader";
import "pages/body/Posting.css";

// External
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark-dimmed.css";

const PreTag = memo(
  ({ elementSize, ...props }: { elementSize: { width: any; height: any } }) => {
    return (
      <pre
        style={{
          whiteSpace: "pre",
          maxWidth: `${elementSize.width}px`,
          overflowX: "auto",
        }}
        {...props}
      />
    );
  }
);

function Posting({ path }: { path: string }) {
  const [isPostingLoading, setIsPostingLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [nextPosting, setNextPosting] = useState<EachPosting | null>(null);
  const [previousPosting, setPreviousPosting] = useState<EachPosting | null>(
    null
  );
  const setAlertData = useContext(SetAlertDataContext);
  const postingData = useContext(PostingDataContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const element = elementRef.current;
      if (element) {
        const { width, height } = element.getBoundingClientRect();
        setElementSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    if (!path || path === "/") {
      return;
    }

    const fetchMarkdown = async () => {
      try {
        setIsPostingLoading(true);
        const response = await fetch(apiUrl + path);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const markdownText = await response.text();
        const { data, content } = parseMarkdown(markdownText);
        const nextPosting =
          postingData && postingData.getNextPosting(data.category, data.title);
        const previousPosting =
          postingData &&
          postingData.getPreviousPosting(data.category, data.title);

        setMarkdownContent(content);
        setNextPosting(nextPosting);
        setPreviousPosting(previousPosting);
      } catch (error: Error | any) {
        setAlertData({
          message: "Unable to load posting",
          statusText: error.message,
        });
      } finally {
        setIsPostingLoading(false);
      }
    };

    fetchMarkdown();
    return () => {
      setMarkdownContent("");
      setNextPosting(null);
      setPreviousPosting(null);
    };

    // eslint-disable-next-line
  }, [path]);

  const components = useMemo(() => {
    return {
      code: ({ ...props }) => {
        return <code style={{ borderRadius: "0.625rem" }} {...props} />;
      },
      img: ({ ...props }) => (
        <img style={{ maxWidth: "100%" }} loading="lazy" {...props} alt="" />
      ),
      pre: ({ ...props }) => {
        return <PreTag elementSize={elementSize} {...props} />;
      },
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={elementRef} className="posting-wrap">
      {isPostingLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <ReactMarkdown
              children={markdownContent}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                ...components,
                pre: (props) => (
                  <components.pre elementSize={elementSize} {...props} />
                ),
              }}
            />
          </div>
          <div>
            {previousPosting && (
              <Link
                to={previousPosting.path}
                className="posting-nav-item nav-prev"
              >
                <span>&lsaquo; {previousPosting.title}</span>
              </Link>
            )}
            {nextPosting && (
              <Link to={nextPosting.path} className="posting-nav-item nav-next">
                <span>{nextPosting.title} &rsaquo;</span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Posting;
