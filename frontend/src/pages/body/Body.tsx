// React
import React, { createContext, useState, useEffect, Suspense } from "react";

// External
import { Routes, Route, useLocation } from "react-router-dom";

// Local
import { apiUrl } from "config";
import { EachPostingMetadata } from "model/postingIndex";
import { PostingIndexController } from "controller/index";
import { AlertType } from "model/alertType";
import { FetchError } from "model/errorType";
import { SetFooterHideCmdContext } from "App";
import Loader from "components/Loader";
import Redirect from "components/Redirect";
import PostingList from "pages/body/PostingList";
import "pages/body/Body.css";

export const PostingIndexControllerContext =
  createContext<PostingIndexController | null>(null);
export const AlertDataContext = createContext<AlertType | null>(null);
export const SetAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType | null>>
>(() => {});

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
  const [alertData, setAlertData] = useState<AlertType | null>(null);
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
    setAlertData(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const func = async () => {
      try {
        setFooterHideCmd(true);
        setIsPostingListLoading(true);

        const response = await fetch(`${apiUrl}/index`);
        if (!response.ok) {
          throw new FetchError(response.status, response.statusText);
        }

        const postingIndexController = new PostingIndexController(
          await response.json()
        );
        setPostingIndexController(postingIndexController);
      } catch (error: Error | FetchError | any) {
        if (error instanceof FetchError) {
          setAlertData({
            title: `${error.status} ${error.statusText}`,
            message: "Unable to load posting list",
          });
        } else {
          setAlertData({
            title: "Ooops!",
            message: "Unable to load posting list",
          });
        }
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
      ) : alertData ? (
        <Redirect
          path="/"
          delaySeconds={5}
          title={`${alertData.title}`}
          message={`${alertData.message}`}
          callback={() => setAlertData(null)}
        />
      ) : (
        <AlertDataContext.Provider value={alertData}>
          <SetAlertDataContext.Provider value={setAlertData}>
            <PostingIndexControllerContext.Provider
              value={postingIndexController}
            >
              <Routes>
                <Route path="/" element={<PostingList />} />

                {postingIndexController &&
                  postingIndexController
                    .getCategoryList()
                    .map((category: string) => {
                      return postingIndexController
                        .getPostingList(category)
                        .map((EachPostingMetadata: EachPostingMetadata) => {
                          return (
                            <Route
                              key={EachPostingMetadata.path}
                              path={EachPostingMetadata.path}
                              element={
                                <Posting path={EachPostingMetadata.path} />
                              }
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
                    <Redirect
                      path="/"
                      delaySeconds={5}
                      title={"404 Not Found"}
                      message={"Requested page not found"}
                      callback={() => setAlertData(null)}
                    />
                  }
                />
              </Routes>
            </PostingIndexControllerContext.Provider>
          </SetAlertDataContext.Provider>
        </AlertDataContext.Provider>
      )}
    </main>
  );
}

export default Body;
