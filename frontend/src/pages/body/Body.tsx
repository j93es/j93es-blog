// React
import React, { useContext, useEffect, Suspense } from "react";

// Local
import {
  IsPostingListLoadingContext,
  AlertDataContext,
  SetAlertDataContext,
} from "App";
import Loader from "components/Loader";
import Redirect from "components/Redirect";
import PostingList from "pages/body/PostingList";
import "pages/body/Body.css";

// External

const Posting = React.lazy(() => import("pages/body/Posting"));

const preloadPosting = () => {
  import("pages/body/Posting");
};

function Body({
  path,
  isExistPath = true,
}: {
  path: string;
  isExistPath?: boolean;
}) {
  const isPostingListLoading = useContext(IsPostingListLoadingContext);
  const alertData = useContext(AlertDataContext);
  const setAlertData = useContext(SetAlertDataContext);

  useEffect(() => {
    preloadPosting();
  }, []);

  useEffect(() => {
    if (!isExistPath && !isPostingListLoading) {
      setAlertData({
        title: "404 Not Found",
        message: "Requested page not found",
      });
      return;
    }

    if (isExistPath) {
      setAlertData(null);
    }
  }, [path, isExistPath, isPostingListLoading, setAlertData]);

  return (
    <main className="body-cont">
      {isPostingListLoading ? (
        <Loader />
      ) : alertData ? (
        <Redirect
          path="/"
          delaySeconds={5}
          title={`${alertData.title}`}
          message={`${alertData.message}`}
          callback={() => setAlertData(null)}
        />
      ) : path === "/" ? (
        <PostingList />
      ) : (
        <Suspense fallback={<Loader />}>
          <Posting path={path} />
        </Suspense>
      )}
    </main>
  );
}

export default Body;
