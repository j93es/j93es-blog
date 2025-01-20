// React
import { useRef, useContext, useEffect, useState } from "react";

// External
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark-dimmed.css";

// Local
import { apiUrl } from "config";
import { EachPostingMetadata } from "model/postingIndex";
import { parseMarkdown } from "utils/index";
import { SetFooterHideCmdContext } from "App";
import {
  SetAlertDataContext,
  PostingIndexControllerContext,
} from "pages/body/Body";
import Loader from "components/Loader";
import CustomPre from "components/CustomPre";
import CustomImage from "components/CustomImage";
import { FetchError } from "model/errorType";
import "pages/body/Posting.css";

function Posting({ path }: { path: string }) {
  const [isPostingLoading, setIsPostingLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [currentPosting, setCurrentPosting] =
    useState<EachPostingMetadata | null>(null);
  const [nextPosting, setNextPosting] = useState<EachPostingMetadata | null>(
    null
  );
  const [previousPosting, setPreviousPosting] =
    useState<EachPostingMetadata | null>(null);
  const setAlertData = useContext(SetAlertDataContext);
  const postingIndexController = useContext(PostingIndexControllerContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);
  const setFooterHideCmd = useContext(SetFooterHideCmdContext);

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
    const fetchMarkdown = async () => {
      try {
        setMarkdownContent("");
        setCurrentPosting(null);
        setNextPosting(null);
        setPreviousPosting(null);

        setFooterHideCmd(true);
        setIsPostingLoading(true);

        const response = await fetch(apiUrl + path);
        if (!response.ok) {
          throw new FetchError(response.status, response.statusText);
        }

        const markdownText = await response.text();
        const { data, content } = parseMarkdown(markdownText);
        const currentPosting = {
          title: data.title,
          date: data.date,
          tag: data.tag,
          category: data.category,
        } as EachPostingMetadata;
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
        setCurrentPosting(currentPosting);
        setNextPosting(nextPosting);
        setPreviousPosting(previousPosting);
      } catch (error: Error | FetchError | any) {
        if (error instanceof FetchError) {
          setAlertData({
            title: `${error.status} ${error.statusText}`,
            message: "Unable to load posting",
          });
        } else {
          setAlertData({
            title: "Ooops!",
            message: "Unable to load posting",
          });
        }
      } finally {
        setIsPostingLoading(false);
        setFooterHideCmd(false);
      }
    };

    fetchMarkdown();

    return () => {
      setMarkdownContent("");
      setCurrentPosting(null);
      setNextPosting(null);
      setPreviousPosting(null);

      setIsPostingLoading(false);
      setFooterHideCmd(false);
    };
  }, [path, postingIndexController, setAlertData, setFooterHideCmd]);

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
    p: ({ ...props }) => {
      return <p style={{ lineHeight: "160%" }} {...props} />;
    },
  });

  return (
    <div ref={elementRef} className="posting-wrap">
      {isPostingLoading ? (
        <Loader />
      ) : (
        <>
          <div className="posting-head">
            <h1 className="posting-title">{currentPosting?.title}</h1>
            <p className="posting-date">{currentPosting?.date}</p>
          </div>
          <div className="posting-content">
            <ReactMarkdown
              children={markdownContent}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
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
          <div className="posting-nav">
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
