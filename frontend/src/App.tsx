import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { MarkdownMetadata } from "module/metadata";
import { apiUrl } from "config";

import Header from "pages/header/Header";
import Body from "pages/body/Body";
import { AlertType } from "module/alert";

export const PostingListContext = createContext<MarkdownMetadata[]>([]);
export const bodyLoadingContext = createContext<boolean>(true);
export const setBodyLoadingContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});
export const alertDataContext = createContext<AlertType | null>(null);
export const setAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType | null>>
>(() => {});

function App() {
  const [alertData, setAlertData] = useState<AlertType | null>(null);
  const [bodyLoading, setBodyLoading] = useState<boolean>(true);
  const [postingList, setPostingList] = useState<MarkdownMetadata[]>([]);

  useEffect(() => {
    if (alertData) {
      alert(`${alertData.message}\n${alertData.statusText}`);
    }
  }, [alertData]);

  useEffect(() => {
    const func = async () => {
      try {
        setBodyLoading(true);
        const response = await fetch(`${apiUrl}/index`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setPostingList(data);
      } catch (error: any) {
        const statusText = error.statusText ? error.statusText : `${error}`;

        setAlertData({
          message: "Failed to get posting list",
          statusText: statusText,
        });
      } finally {
        setBodyLoading(false);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <alertDataContext.Provider value={alertData}>
        <setAlertDataContext.Provider value={setAlertData}>
          <bodyLoadingContext.Provider value={bodyLoading}>
            <setBodyLoadingContext.Provider value={setBodyLoading}>
              <PostingListContext.Provider value={postingList}>
                <BrowserRouter>
                  <Header />
                  <Routes>
                    <Route
                      key={`route`}
                      path={`/`}
                      element={<Body path={`/`} />}
                    />
                    {postingList.map((posting) => (
                      <Route
                        key={`route-${posting.title}`}
                        path={`/${posting.path}`}
                        element={<Body path={`/${posting.path}`} />}
                      />
                    ))}
                  </Routes>
                </BrowserRouter>
              </PostingListContext.Provider>
            </setBodyLoadingContext.Provider>
          </bodyLoadingContext.Provider>
        </setAlertDataContext.Provider>
      </alertDataContext.Provider>
    </div>
  );
}

export default App;
