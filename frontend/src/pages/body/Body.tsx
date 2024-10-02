import { useContext, useEffect, useState } from "react";
import { apiUrl } from "config/app-config";
import {
  bodyLoadingContext,
  setBodyLoadingContext,
  alertMessageContext,
  setAlertMessageContext,
} from "App";
import Loader from "pages/body/Loader";
import AlertRedirect from "pages/body/AlertRedirect";
import PostingList from "pages/body/PostingList";
import Posting from "pages/body/Posting";
import "pages/body/Body.css";

function Body({ path }: { path: string }) {
  const [markdownContent, setMarkdownContent] = useState("");
  const loading = useContext(bodyLoadingContext);
  const alertMessage = useContext(alertMessageContext);
  const setBodyLoading = useContext(setBodyLoadingContext);
  const setAlertMessage = useContext(setAlertMessageContext);

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
          throw new Error();
        }
        const markdownText = await response.text();
        setMarkdownContent(markdownText.split("---")[2]);
      } catch (error: Error | any) {
        setAlertMessage("Failed to fetch markdown");
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

  if (alertMessage) {
    return (
      <div className="body-wrapper">
        {<AlertRedirect path="/" delaySeconds={5} message={alertMessage} />}
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
