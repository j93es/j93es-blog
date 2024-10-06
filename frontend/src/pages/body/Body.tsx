import React, { useContext, useEffect, useState, Suspense } from "react";
import { apiUrl } from "config";
import {
  bodyLoadingContext,
  setBodyLoadingContext,
  alertDataContext,
  setAlertDataContext,
} from "App";
import Loader from "components/Loader";
import Redirect from "components/Redirect";
import PostingList from "pages/body/PostingList";

import "pages/body/Body.css";

const Posting = React.lazy(() => import("pages/body/Posting"));

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
      <main className="body-wrapper">
        {
          <Redirect
            path="/"
            delaySeconds={5}
            title={alertData.statusText}
            message={alertData.message}
            callback={() => setAlertData(null)}
          />
        }
      </main>
    );
  }

  if (loading) {
    return <main className="body-wrapper">{<Loader />}</main>;
  }

  if (path === "/") {
    return <main className="body-wrapper">{<PostingList />}</main>;
  }

  return (
    <main className="body-wrapper">
      {
        <Suspense fallback={<Loader />}>
          <Posting markdownContent={markdownContent} />
        </Suspense>
      }
    </main>
  );
}

export default Body;
