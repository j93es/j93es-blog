// React
import { useRef, useContext, useEffect, useState } from "react";

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
import { EachPostingMetadata } from "model/postingIndex";
import { parseMarkdown } from "utils/index";
import { PostingIndexControllerContext } from "pages/body/Body";
import Loader from "components/Loader";
import CustomPre from "components/CustomPre";
import CustomImage from "components/CustomImage";
import MetaTag from "components/MetaTag";
import { FetchError } from "model/errorType";
import { errorRedirect } from "utils/index";
import "pages/body/Posting.css";

const Posting = ({ path }: { path: string }) => {
  const [isPostingLoading, setIsPostingLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [currentPosting, setCurrentPosting] =
    useState<EachPostingMetadata | null>(null);
  const [nextPosting, setNextPosting] = useState<EachPostingMetadata | null>(
    null
  );
  const [previousPosting, setPreviousPosting] =
    useState<EachPostingMetadata | null>(null);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const postingIndexController = useContext(PostingIndexControllerContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);

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
        setDescription(undefined);

        setIsPostingLoading(true);

        const response = await fetch(urlJoin(apiUrl, path));
        if (!response.ok) {
          throw new FetchError(response.status, response.statusText);
        }

        const markdownText = await response.text();
        const { data, content } = parseMarkdown.get(markdownText);
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

        const getDescription = () => {
          let desc = "안녕하세요! j93es 블로그입니다. ";
          if (data.title) desc += `이 포스팅의 제목은 ${data.title}입니다. `;
          if (data.date) desc += `${data.date}에 작성되었습니다. `;
          if (data.category) desc += `${data.category} 카테고리로 분류됩니다. `;
          if (data.tag) desc += `${data.tag}와 관련한 내용을 담고 있습니다. `;

          return desc.trim();
        };

        setMarkdownContent(content);
        setCurrentPosting(currentPosting);
        setNextPosting(nextPosting);
        setPreviousPosting(previousPosting);
        setDescription(getDescription());
      } catch (error: Error | FetchError | any) {
        errorRedirect({
          statusCode: error.status || 500,
          message: "포스팅을 불러오는 중 오류가 발생했습니다.",
        });
      } finally {
        setIsPostingLoading(false);
      }
    };

    fetchMarkdown();

    return () => {
      setMarkdownContent("");
      setCurrentPosting(null);
      setNextPosting(null);
      setPreviousPosting(null);
      setIsPostingLoading(false);
    };
  }, [path, postingIndexController]);

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
    th: ({ ...props }) => {
      return (
        <th
          style={{
            padding: "0.5rem",
            borderBottom: "0.125rem solid var(--underline-color)",
          }}
          {...props}
        />
      );
    },
    td: ({ ...props }) => {
      return (
        <td
          style={{
            padding: "0.5rem",
            borderBottom: "0.0625rem solid var(--underline-color)",
          }}
          {...props}
        />
      );
    },
  });

  return (
    <div ref={elementRef} className="posting-wrap">
      {currentPosting?.title && description && (
        <MetaTag title={currentPosting.title} description={description} />
      )}
      {isPostingLoading ? (
        <Loader />
      ) : (
        <>
          <div className="posting-head">
            <h1 className="posting-title">{currentPosting?.title}</h1>
            <p className="posting-tag">
              {currentPosting?.tag && `Tags | ${currentPosting.tag.join(", ")}`}
            </p>
            <p className="posting-date">
              {currentPosting?.date && `Date | ${currentPosting.date}`}
            </p>
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
};

export default Posting;
