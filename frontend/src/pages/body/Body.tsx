import { useContext, useEffect, useState } from "react";
import { apiUrl } from "config/app-config";
import { bodyLoadingContext, setBodyLoadingContext } from "App";
import Loader from "pages/body/Loader";

import PostingList from "pages/body/PostingList";
import Posting from "pages/body/Posting";
import "pages/body/Body.css";

function Body({ path }: { path: string }) {
  const [markdownContent, setMarkdownContent] = useState("");
  const loading = useContext(bodyLoadingContext);
  const setBodyLoading = useContext(setBodyLoadingContext);

  useEffect(() => {
    if (!path || path === "/") {
      setMarkdownContent("");
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

  const jsxElem =
    path === "/" ? (
      <PostingList />
    ) : (
      <Posting markdownContent={markdownContent} />
    );

  return <div className="body-wrapper">{loading ? <Loader /> : jsxElem}</div>;
}

export default Body;
