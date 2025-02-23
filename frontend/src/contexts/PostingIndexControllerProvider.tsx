// React
import React, { createContext, useState, useContext } from "react";

// External

// Local
import { PostingIndex } from "models/postingIndex";
import { PostingIndexController } from "controllers/index";

const PostingIndexControllerContext = createContext<{
  postingIndexController: PostingIndexController | null;
  setPostingIndexController: (postingIndex: PostingIndex | null) => void;
}>({
  postingIndexController: null,
  setPostingIndexController: () => {},
});

const PostingIndexControllerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [postingIndexController, _setPostingIndexController] =
    useState<PostingIndexController | null>(null);

  const setPostingIndexController = (postingIndex: PostingIndex | null) => {
    _setPostingIndexController(
      postingIndex ? new PostingIndexController(postingIndex) : null
    );
  };

  return (
    <PostingIndexControllerContext
      value={{
        postingIndexController,
        setPostingIndexController,
      }}
    >
      {children}
    </PostingIndexControllerContext>
  );
};

const usePostingIndexController = () =>
  useContext(PostingIndexControllerContext);

export { PostingIndexControllerProvider, usePostingIndexController };
