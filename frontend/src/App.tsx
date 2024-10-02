import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { MarkdownMetadata } from "module/metadata";
import { apiUrl } from "config/app-config";

import Header from "pages/header/Header";
import Body from "pages/body/Body";

export const PostingListContext = createContext<MarkdownMetadata[]>([]);
export const bodyLoadingContext = createContext<boolean>(true);
export const setBodyLoadingContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});
export const alertMessageContext = createContext<string>("");
export const setAlertMessageContext = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});

function App() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [bodyLoading, setBodyLoading] = useState<boolean>(true);
  const [postingList, setPostingList] = useState<MarkdownMetadata[]>([]);

  useEffect(() => {
    if (alertMessage) {
      alert(`${alertMessage}`);
    }
  }, [alertMessage]);

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
          throw new Error();
        }
        const data = await response.json();
        setPostingList(data);
      } catch (error) {
        setAlertMessage("Failed to get posting list");
      } finally {
        setBodyLoading(false);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <alertMessageContext.Provider value={alertMessage}>
        <setAlertMessageContext.Provider value={setAlertMessage}>
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
        </setAlertMessageContext.Provider>
      </alertMessageContext.Provider>
    </div>
  );
}

export default App;
