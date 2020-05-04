import React, { createContext, useState } from 'react'
import Content from './Content';

export const PostListContext = createContext();
export const SelectedPostIndexContext = createContext();
export const FullScreenModalContext = createContext();
export const SearchQueryContext = createContext();

export default function App() {
  const postList = useState([]);
  const selectedPostIndex = useState(null);
  const showFullscreenModal = useState(false);
  const searchQuery = useState({ tags: [], page: 0 });

  return (
    <SearchQueryContext.Provider value={searchQuery}>
      <PostListContext.Provider value={postList}>
        <SelectedPostIndexContext.Provider value={selectedPostIndex}>
          <FullScreenModalContext.Provider value={showFullscreenModal}>
            <Content />
          </FullScreenModalContext.Provider>
        </SelectedPostIndexContext.Provider>
      </PostListContext.Provider>
    </SearchQueryContext.Provider>
  )
}
