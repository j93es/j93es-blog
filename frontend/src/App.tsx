// React
import React, { createContext, useState, useEffect } from "react";
import { EachPosting, PostingDataClass } from "model/posting-data";
import { apiUrl } from "config";
import { AlertType } from "model/alert";
import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";

// External
import { Routes, Route } from "react-router-dom";

// Local
import "App.css";

export const PostingDataContext = createContext<PostingDataClass | null>(null);
export const IsPostingListLoadingContext = createContext<boolean>(true);
export const AlertDataContext = createContext<AlertType | null>(null);
export const SetAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType | null>>
>(() => {});

function App() {
  const [alertData, setAlertData] = useState<AlertType | null>(null);
  const [isPostingListLoading, setIsPostingListLoading] =
    useState<boolean>(true);
  const [postingData, setPostingData] = useState<PostingDataClass | null>(null);

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
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const postingData = new PostingDataClass(await response.json());

        setPostingData(new PostingDataClass(postingData.sortPostingData()));
      } catch (error: any) {
        setAlertData({
          message: "Unable to load posting list",
          statusText: error.message,
        });
      } finally {
        setIsPostingListLoading(false);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <Header />
      <AlertDataContext.Provider value={alertData}>
        <SetAlertDataContext.Provider value={setAlertData}>
          <IsPostingListLoadingContext.Provider value={isPostingListLoading}>
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
                            element={<Body path={eachPosting.path} />}
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
          </IsPostingListLoadingContext.Provider>
        </SetAlertDataContext.Provider>
      </AlertDataContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
