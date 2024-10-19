// React
import React, { createContext, useState, useEffect } from "react";
import { EachPostingMetadata } from "model/postingIndex";
import { PostingIndexController } from "controller/index";
import { apiUrl } from "config";
import { AlertType } from "model/alertType";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";

// External
import { Routes, Route } from "react-router-dom";

// Local
import { FetchError } from "model/errorType";
import "App.css";

export const PostingIndexControllerContext =
  createContext<PostingIndexController | null>(null);
export const IsPostingListLoadingContext = createContext<boolean>(true);
export const AlertDataContext = createContext<AlertType | null>(null);
export const SetAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType | null>>
>(() => {});
export const SetFooterHideCmdContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

function App() {
  const [alertData, setAlertData] = useState<AlertType | null>(null);
  const [isPostingListLoading, setIsPostingListLoading] =
    useState<boolean>(true);
  const [postingIndexController, setPostingIndexController] =
    useState<PostingIndexController | null>(null);

  const [footerHideCmd, setFooterHideCmd] = useState(false);

  useEffect(() => {
    const func = async () => {
      try {
        setIsPostingListLoading(true);
        const response = await fetch(`${apiUrl}/index`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
            title: "Error",
            message: "Unable to load posting list",
          });
        }
      } finally {
        setIsPostingListLoading(false);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <Header />
      <SetFooterHideCmdContext.Provider value={setFooterHideCmd}>
        <AlertDataContext.Provider value={alertData}>
          <SetAlertDataContext.Provider value={setAlertData}>
            <IsPostingListLoadingContext.Provider value={isPostingListLoading}>
              <PostingIndexControllerContext.Provider
                value={postingIndexController}
              >
                <Routes>
                  <Route path="/" element={<Body path="/" />} />
                  <Route
                    path="/policy/information-protection-policy.md"
                    element={
                      <Body path="/policy/information-protection-policy.md" />
                    }
                  />
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
                                  <Body path={EachPostingMetadata.path} />
                                }
                              />
                            );
                          });
                      })}
                  <Route
                    path="*"
                    element={<Body path="*" isExistPath={false} />}
                  />
                </Routes>
              </PostingIndexControllerContext.Provider>
            </IsPostingListLoadingContext.Provider>
          </SetAlertDataContext.Provider>
        </AlertDataContext.Provider>
      </SetFooterHideCmdContext.Provider>
      <Footer footerHideCmd={footerHideCmd} />
    </div>
  );
}

export default App;
