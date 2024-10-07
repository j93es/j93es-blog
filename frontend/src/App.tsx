import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { MarkdownMetadata } from "module/metadata";
import { apiUrl } from "config";
import { AlertType } from "module/alert";

import Header from "pages/header/Header";
import Body from "pages/body/Body";
import Footer from "pages/footer/Footer";

export const PostingListContext = createContext<MarkdownMetadata[] | null>(
  null
);
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
  const [postingList, setPostingList] = useState<MarkdownMetadata[] | null>(
    null
  );

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
        const data = await response.json();
        setPostingList(data);
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
              <PostingListContext.Provider value={postingList}>
                <Routes>
                  <Route path="/" element={<Body path="/" />} />
                  {postingList?.map((posting) => (
                    <Route
                      key={`route-${posting.title}`}
                      path={`/${posting.path}`}
                      element={<Body path={`/${posting.path}`} />}
                    />
                  ))}
                  <Route
                    path="*"
                    element={<Body path="/" isExistPath={false} />}
                  />
                </Routes>
              </PostingListContext.Provider>
            </SetLoadingContext.Provider>
          </LoadingContext.Provider>
        </SetAlertDataContext.Provider>
      </AlertDataContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
