import React, { createContext, useState } from 'react'
import Content from './Content';

export const PostListContext = createContext();
export const SelectedPostContext = createContext();
export const FullScreenModalContext = createContext();
export const SearchQueryContext = createContext();

export default function App() {
  const postList = useState([]);
  const selectedPost = useState(null);
  const showFullscreenModal = useState(false);
  const searchQuery = useState({ tags: [], page: 0 });

  return (
    <SearchQueryContext.Provider value={searchQuery}>
      <PostListContext.Provider value={postList}>
        <SelectedPostContext.Provider value={selectedPost}>
          <FullScreenModalContext.Provider value={showFullscreenModal}>
            <Content />
          </FullScreenModalContext.Provider>
        </SelectedPostContext.Provider>
      </PostListContext.Provider>
    </SearchQueryContext.Provider>
  )
}
