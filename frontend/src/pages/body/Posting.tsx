// React
import { useRef, useContext, useEffect, useState } from "react";

// Local
import { apiUrl } from "config";
import { EachPostingMetadata } from "model/postingIndex";
import { parseMarkdown } from "utils/index";
import { SetAlertDataContext, PostingIndexControllerContext } from "App";
import Loader from "components/Loader";
import CustomPre from "components/CustomPre";
import "pages/body/Posting.css";

// External
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark-dimmed.css";

function Posting({ path }: { path: string }) {
  const [isPostingLoading, setIsPostingLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [nextPosting, setNextPosting] = useState<EachPostingMetadata | null>(
    null
  );
  const [previousPosting, setPreviousPosting] =
    useState<EachPostingMetadata | null>(null);
  const setAlertData = useContext(SetAlertDataContext);
  const postingIndexController = useContext(PostingIndexControllerContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const element = elementRef.current;
      if (element) {
        const { width } = element.getBoundingClientRect();
        setElementWidth(width);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
    // eslint-disable-next-line
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
          postingIndexController &&
          postingIndexController.getNextPostingMetadata(
            data.category,
            data.title
          );
        const previousPosting =
          postingIndexController &&
          postingIndexController.getPreviousPostingMetadata(
            data.category,
            data.title
          );

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

  const components = useRef({
    code: ({ ...props }) => {
      return <code style={{ borderRadius: "0.625rem" }} {...props} />;
    },
    img: ({ ...props }) => {
      return (
        <img
          {...props}
          style={{ maxWidth: "100%", height: "auto" }}
          alt={props.alt || "이미지 로드 실패"}
        />
      );
    },
    pre: ({ ...props }) => {
      return <CustomPre elementWidth={elementWidth} {...props} />;
    },
  });

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
                ...components.current,
                pre: (props) => (
                  <components.current.pre
                    elementWidth={elementWidth}
                    {...props}
                  />
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
