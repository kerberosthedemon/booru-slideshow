import React from 'react';
import { createContext, useState } from 'react';

export const PostListContext = createContext();
export const SelectedPostIndexContext = createContext();

export const PostContextProvider = ({ children }) => {
  const postListState = useState([]);
  const [postList, setPostList] = postListState;

  const selectedIndexState = useState(null);

  const setProgress = (index, value) => {
    setPostList(posts => {
      const newPosts = [];
      posts[index].loadingPercentage = value;
      return newPosts.concat(posts);
    });
  }

  const actions = { setProgress, setPostList }

  return (
    <PostListContext.Provider value={[postList, actions]}>
      <SelectedPostIndexContext.Provider value={selectedIndexState}>
        {children}
      </SelectedPostIndexContext.Provider>
    </PostListContext.Provider>
  );
}

