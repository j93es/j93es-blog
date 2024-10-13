---
title: tempddddddddddddddddddddtempddddddddddddddddddddtempdddddddddddddddddddd
date: 2024-09-26 15:30
tag: [fullstack]
category: dev
---

# 기술스택

- Framework: React
- UserInterface: Bootstrap
- Language: TypeScript
- Infra: Nginx, Cloudflare(or AWS Route53)

```typescript
// React
import { useContext, useEffect, useState } from "react";

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

function Posting({ path }: { path: string }) {
  const components = {
    code: ({ ...props }) => {
      return <code style={{ borderRadius: "0.625rem" }} {...props} />;
    },
    img: ({ ...props }) => (
      <img style={{ maxWidth: "100%" }} loading="lazy" {...props} alt="" />
    ),
    pre: ({ ...props }) => {
      return (
        <pre style={{ whiteSpace: "pre-wrap", width: "100%" }} {...props} />
      );
    },
  };
  const [isPostingLoading, setIsPostingLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [nextPosting, setNextPosting] = useState<EachPosting | null>(null);
  const [previousPosting, setPreviousPosting] = useState<EachPosting | null>(
    null
  );
  const setAlertData = useContext(SetAlertDataContext);

  const postingData = useContext(PostingDataContext);

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

  return (
    <div className="posting-wrap">
      {isPostingLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <ReactMarkdown
              children={markdownContent}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={components}
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

https://j93.es/api/image/dev/backend-begin/performance-test.pnghttps://j93.es/api/image/dev/backend-begin/performance-test.png
```

![성능 테스트](https://j93.es/api/image/dev/backend-begin/performance-test.png)
