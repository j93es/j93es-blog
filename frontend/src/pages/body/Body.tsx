import React, { useContext, useEffect, useState, Suspense } from "react";
import { apiUrl } from "config";
import {
  LoadingContext,
  SetLoadingContext,
  AlertDataContext,
  SetAlertDataContext,
  PostingDataContext,
} from "App";

import Loader from "components/Loader";
import Redirect from "components/Redirect";
import PostingList from "pages/body/PostingList";

import "pages/body/Body.css";
import { EachPosting } from "model/PostingData";

const Posting = React.lazy(() => import("pages/body/Posting"));

function Body({
  path,
  eachPosting = null,
  isExistPath = true,
}: {
  path: string;
  eachPosting?: EachPosting | null;
  isExistPath?: boolean;
}) {
  const [markdownContent, setMarkdownContent] = useState("");
  const loading = useContext(LoadingContext);
  const alertData = useContext(AlertDataContext);
  const postingData = useContext(PostingDataContext);
  const setLoading = useContext(SetLoadingContext);
  const setAlertData = useContext(SetAlertDataContext);

  useEffect(() => {
    if (postingData?.getCategoryList() && !isExistPath) {
      setAlertData({
        message: "Requested page not found",
        statusText: "404 Not Found",
      });
      return;
    }

    if (isExistPath) {
      setAlertData(null);
    }
  }, [path, postingData, isExistPath, setAlertData]);

  useEffect(() => {
    if (!path || path === "/") {
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
        setMarkdownContent(markdownText);
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

  return (
    <main className="body-cont">
      {loading ? (
        <Loader />
      ) : alertData ? (
        <Redirect
          path="/"
          delaySeconds={5}
          title={`${alertData.statusText}`}
          message={`${alertData.message}`}
        />
      ) : path === "/" ? (
        <PostingList />
      ) : (
        <Suspense fallback={<Loader />}>
          <Posting
            markdownContent={markdownContent}
            eachPosting={eachPosting}
          />
        </Suspense>
      )}
    </main>
  );
}

export default Body;
