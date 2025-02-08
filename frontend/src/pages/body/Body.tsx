// React
import React, { createContext, useState, useEffect, Suspense } from "react";

// External
import { Routes, Route, useLocation } from "react-router-dom";
import urlJoin from "url-join";

// Local
import { apiUrl } from "config";
import { EachPostingMetadata } from "model/postingIndex";
import { PostingIndexController } from "controller/index";
import { FetchError } from "model/errorType";
import Loader from "components/Loader";
import ErrorRedirect from "components/ErrorRedirect";
import PostingList from "pages/body/PostingList";
import { errorRedirect } from "utils/index";
import "pages/body/Body.css";

const PostingIndexControllerContext =
  createContext<PostingIndexController | null>(null);

const loadPostingComponent = () => {
  return import("pages/body/Posting");
};
const ORIGIN_POSTING = React.lazy(loadPostingComponent);
const Posting = ({ path }: { path: string }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ORIGIN_POSTING path={path} />
    </Suspense>
  );
};

const Body = () => {
  const [isPostingListLoading, setIsPostingListLoading] =
    useState<boolean>(true);
  const [postingIndexController, setPostingIndexController] =
    useState<PostingIndexController | null>(null);
  const location = useLocation();

  useEffect(() => {
    // preload Posting component
    loadPostingComponent();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const func = async () => {
      try {
        setIsPostingListLoading(true);

        const response = await fetch(urlJoin(apiUrl, "index"));
        if (!response.ok) {
          throw new FetchError(response.status, response.statusText);
        }
        const postingIndex = await response.json();
        const postingIndexController = new PostingIndexController(postingIndex);
        setPostingIndexController(postingIndexController);
      } catch (error: Error | FetchError | any) {
        errorRedirect({
          statusCode: error.status || 500,
          message: "포스팅 목록을 불러오는 중 오류가 발생했습니다.",
        });
      } finally {
        setIsPostingListLoading(false);
      }
    };
    func();
  }, []);

  return (
    <main className="body-cont">
      {isPostingListLoading ? (
        <Loader />
      ) : (
        <PostingIndexControllerContext value={postingIndexController}>
          <Routes>
            <Route path="/" element={<PostingList />} />

            {postingIndexController &&
              postingIndexController
                .getCategoryList()
                .map((category: string) => {
                  return postingIndexController
                    .getPostingList(category)
                    .map((eachPostingMetadata: EachPostingMetadata) => {
                      return (
                        <Route
                          key={eachPostingMetadata.path}
                          path={eachPostingMetadata.path}
                          element={<Posting {...eachPostingMetadata} />}
                        />
                      );
                    });
                })}

            <Route
              path="/policy/information-protection-policy.md"
              element={
                <Posting path="/policy/information-protection-policy.md" />
              }
            />

            <Route
              path="*"
              element={
                <ErrorRedirect
                  statusCode={404}
                  message="요청하신 페이지를 찾을 수 없습니다."
                />
              }
            />
          </Routes>
        </PostingIndexControllerContext>
      )}
    </main>
  );
};

export { PostingIndexControllerContext };
export default Body;
