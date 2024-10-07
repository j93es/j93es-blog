import React, { useContext, useEffect, useState, Suspense } from "react";
import { apiUrl } from "config";
import {
  LoadingContext,
  SetLoadingContext,
  AlertDataContext,
  SetAlertDataContext,
  PostingListContext,
} from "App";

import Loader from "components/Loader";
import Redirect from "components/Redirect";
import PostingList from "pages/body/PostingList";

import "pages/body/Body.css";

const Posting = React.lazy(() => import("pages/body/Posting"));

function Body({
  path,
  isExistPath = true,
}: {
  path: string;
  isExistPath?: boolean;
}) {
  const [markdownContent, setMarkdownContent] = useState("");
  const loading = useContext(LoadingContext);
  const alertData = useContext(AlertDataContext);
  const postingList = useContext(PostingListContext);
  const setLoading = useContext(SetLoadingContext);
  const setAlertData = useContext(SetAlertDataContext);

  useEffect(() => {
    if (postingList && !isExistPath) {
      setAlertData({
        message: "Requested page not found",
        statusText: "Not Found",
      });
      return;
    }
    if (isExistPath) {
      setAlertData(null);
    }

    // eslint-disable-next-line
  }, [postingList, isExistPath]);

  useEffect(() => {
    if (!path || path === "/") {
      setMarkdownContent("");
      return;
    }

    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl + path);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const markdownText = await response.text();
        setMarkdownContent(markdownText.split("---")[2]);
      } catch (error: Error | any) {
        setAlertData({
          message: "Unable to load posting",
          statusText: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
    return () => {
      setMarkdownContent("");
    };

    // eslint-disable-next-line
  }, [path]);

  const getJsx = () => {
    if (loading) {
      return <Loader />;
    }

    if (alertData) {
      return (
        <Redirect
          path="/"
          delaySeconds={5}
          title={alertData.statusText}
          message={alertData.message}
          callback={() => setAlertData(null)}
        />
      );
    }

    if (path === "/") {
      return <PostingList />;
    }

    return (
      <Suspense fallback={<Loader />}>
        <Posting markdownContent={markdownContent} />
      </Suspense>
    );
  };

  return <main className="body-cont">{getJsx()}</main>;
}

export default Body;
