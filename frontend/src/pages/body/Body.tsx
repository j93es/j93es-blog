import { useContext, useEffect, useState } from "react";
import { apiUrl } from "config";
import {
  bodyLoadingContext,
  setBodyLoadingContext,
  alertDataContext,
  setAlertDataContext,
} from "App";
import Loader from "pages/body/Loader";
import AlertRedirect from "pages/body/AlertRedirect";
import PostingList from "pages/body/PostingList";
import Posting from "pages/body/Posting";
import "pages/body/Body.css";

function Body({ path }: { path: string }) {
  const [markdownContent, setMarkdownContent] = useState("");
  const loading = useContext(bodyLoadingContext);
  const alertData = useContext(alertDataContext);
  const setBodyLoading = useContext(setBodyLoadingContext);
  const setAlertData = useContext(setAlertDataContext);

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
          throw new Error(response.statusText);
        }
        const markdownText = await response.text();
        setMarkdownContent(markdownText.split("---")[2]);
      } catch (error: Error | any) {
        const statusText = error.statusText ? error.statusText : `${error}`;

        setAlertData({
          message: "Failed to fetch markdown",
          statusText: statusText,
        });
      } finally {
        setBodyLoading(false);
      }
    };

    fetchMarkdown();
    return () => {
      setMarkdownContent("");
    };

    // eslint-disable-next-line
  }, [path]);

  if (alertData) {
    return (
      <div className="body-wrapper">
        {<AlertRedirect path="/" delaySeconds={5} alertData={alertData} />}
      </div>
    );
  }

  if (loading) {
    return <div className="body-wrapper">{<Loader />}</div>;
  }

  if (path === "/") {
    return <div className="body-wrapper">{<PostingList />}</div>;
  }

  return (
    <div className="body-wrapper">
      {<Posting markdownContent={markdownContent} />}
    </div>
  );
}

export default Body;
