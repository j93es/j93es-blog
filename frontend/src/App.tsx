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

function App() {
  const [postingList, setPostingList] = useState<MarkdownMetadata[]>([]);
  const [bodyLoading, setBodyLoading] = useState<boolean>(true);

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
          throw new Error("Failed to get posting list");
        }
        const data = await response.json();
        setPostingList(data);
        setBodyLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, []);

  return (
    <div className="App">
      <bodyLoadingContext.Provider value={bodyLoading}>
        <setBodyLoadingContext.Provider value={setBodyLoading}>
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
        </setBodyLoadingContext.Provider>
      </bodyLoadingContext.Provider>
    </div>
  );
}

export default App;
