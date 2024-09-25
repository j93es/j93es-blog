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
export const LoadingContext = createContext<boolean>(true);
export const setLoadingContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

function App() {
  const [postingList, setPostingList] = useState<MarkdownMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          throw new Error("Failed to get posting list");
        }
        const data = await response.json();
        setPostingList(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <LoadingContext.Provider value={loading}>
        <setLoadingContext.Provider value={setLoading}>
          <PostingListContext.Provider value={postingList}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route key={`route`} path={`/`} element={<Body path={`/`} />} />
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
        </setLoadingContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
