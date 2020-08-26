import React from 'react';
import { createContext, useState } from 'react';

export const PostListContext = createContext();
export const SelectedPostIndexContext = createContext();

export const PostContextProvider = ({ children }) => {
  const postListState = useState([]);
  const selectedIndexState = useState(null);

  return (
    <PostListContext.Provider value={postListState}>
      <SelectedPostIndexContext.Provider value={selectedIndexState}>
        {children}
      </SelectedPostIndexContext.Provider>
    </PostListContext.Provider>
  );
}

