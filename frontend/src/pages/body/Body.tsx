// React
import React, { useEffect, Suspense } from "react";

// External
import { Routes, Route } from "react-router-dom";
import urlJoin from "url-join";

// Local
import { apiUrl } from "config";
import { EachPostingMetadata, PostingIndex } from "models/postingIndex";
import { useLoading } from "contexts/LoadingProvider";
import { usePostingIndexController } from "contexts/PostingIndexControllerProvider";
import useFetch from "customHooks/useFetch";
import Spinner from "components/Spinner";
import LoadingIndicator from "components/LoadingIndicator";
import ErrorRedirecter from "components/ErrorRedirecter";
import PostingList from "pages/body/PostingList/PostingList";
import "pages/body/Body.css";

interface BodyProps {}

const loadPostingComponent = () => {
  return import("pages/body/Posting/Posting");
};
const ORIGIN_POSTING = React.lazy(loadPostingComponent);
const Posting = ({ path }: { path: string }) => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ORIGIN_POSTING path={path} />
    </Suspense>
  );
};

const Body: React.FC<BodyProps> = () => {
  const { isLoading } = useLoading();
  const { postingIndexController, setPostingIndexController } =
    usePostingIndexController();

  const { data: postingIndex }: { data: PostingIndex | null } = useFetch(
    urlJoin(apiUrl, "/posting-index.json"),
    null, // 초기 값
    [], // 의존성 배열 (한 번만 실행)
    { responseType: "json" }
  );

  useEffect(() => {
    // preload Posting component
    loadPostingComponent();
  }, []);

  useEffect(() => {
    if (!postingIndex) {
      return;
    }
    setPostingIndexController(postingIndex);

    // eslint-disable-next-line
  }, [postingIndex]);

  return (
    <main className="body-cont">
      {isLoading && <Spinner />}
      {postingIndexController && (
        <div className={isLoading ? "body-item hidden" : "body-item"}>
          <Routes>
            <Route path="/" element={<PostingList />} />

            {postingIndexController
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
                <ErrorRedirecter
                  statusCode={404}
                  message="요청하신 페이지를 찾을 수 없습니다."
                />
              }
            />
          </Routes>
        </div>
      )}
    </main>
  );
};

export default Body;
