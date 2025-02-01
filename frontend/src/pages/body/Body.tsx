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
import { SetFooterHideCmdContext } from "App";
import Loader from "components/Loader";
import ErrorRedirect, { errorRedirect } from "components/ErrorRedirect";
import PostingList from "pages/body/PostingList";
import "pages/body/Body.css";

export const PostingIndexControllerContext =
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

function Body() {
  const [isPostingListLoading, setIsPostingListLoading] =
    useState<boolean>(true);
  const [postingIndexController, setPostingIndexController] =
    useState<PostingIndexController | null>(null);
  const setFooterHideCmd = React.useContext(SetFooterHideCmdContext);
  const location = useLocation();

  useEffect(() => {
    // preload Posting component
    loadPostingComponent();
  }, []);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (error) {}
  }, [location.pathname]);

  useEffect(() => {
    const func = async () => {
      try {
        setFooterHideCmd(true);
        setIsPostingListLoading(true);

        const response = await fetch(urlJoin(apiUrl, "index"));
        if (!response.ok) {
          throw new FetchError(response.status, response.statusText);
        }

        const postingIndexController = new PostingIndexController(
          await response.json()
        );
        setPostingIndexController(postingIndexController);
      } catch (error: Error | FetchError | any) {
        errorRedirect({
          statusCode: error.status || 500,
          message: "포스팅 목록을 불러오는 중 오류가 발생했습니다.",
        });
      } finally {
        setIsPostingListLoading(false);
        setFooterHideCmd(false);
      }
    };
    func();
  }, [setFooterHideCmd]);

  return (
    <main className="body-cont">
      {isPostingListLoading ? (
        <Loader />
      ) : (
        <PostingIndexControllerContext.Provider value={postingIndexController}>
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
        </PostingIndexControllerContext.Provider>
      )}
    </main>
  );
}

export default Body;
