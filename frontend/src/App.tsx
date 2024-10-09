import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { PostingData, EachPosting, PostingDataClass } from "module/PostingData";
import { apiUrl } from "config";
import { AlertType } from "module/Alert";

import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";

export const PostingDataContext = createContext<PostingDataClass | null>(null);
export const LoadingContext = createContext<boolean>(true);
export const SetLoadingContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});
export const AlertDataContext = createContext<AlertType | null>(null);
export const SetAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType | null>>
>(() => {});

function App() {
  const [alertData, setAlertData] = useState<AlertType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postingData, setPostingData] = useState<PostingDataClass | null>(null);

  useEffect(() => {
    const func = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/index`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const postingData: PostingData = await response.json();

        setPostingData(new PostingDataClass(postingData));
      } catch (error: any) {
        setAlertData({
          message: "Unable to load posting list",
          statusText: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <Header />
      <AlertDataContext.Provider value={alertData}>
        <SetAlertDataContext.Provider value={setAlertData}>
          <LoadingContext.Provider value={loading}>
            <SetLoadingContext.Provider value={setLoading}>
              <PostingDataContext.Provider value={postingData}>
                <Routes>
                  <Route path="/" element={<Body path="/" />} />
                  <Route
                    path="/policy/information-protection-policy.md"
                    element={
                      <Body path="/policy/information-protection-policy.md" />
                    }
                  />
                  {postingData &&
                    postingData.getCategoryList().map((category: string) => {
                      return postingData
                        .getPostingList(category)
                        .map((eachPosting: EachPosting) => {
                          return (
                            <Route
                              key={eachPosting.path}
                              path={eachPosting.path}
                              element={
                                <Body
                                  path={eachPosting.path}
                                  eachPosting={eachPosting}
                                />
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
              </PostingDataContext.Provider>
            </SetLoadingContext.Provider>
          </LoadingContext.Provider>
        </SetAlertDataContext.Provider>
      </AlertDataContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
