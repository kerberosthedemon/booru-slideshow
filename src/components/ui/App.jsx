import React, { createContext, useState } from 'react'
import Content from './Content';
import useSearchQuery from '../hooks/useSearchQuery';
import { PostContextProvider } from '../context/PostContextProvider';

export const FullScreenModalContext = createContext({});
export const SearchQueryContext = createContext({});

export default function App() {
  const showFullscreenModal = useState(false);
  const searchQuery = useSearchQuery();

  return (
    <SearchQueryContext.Provider value={searchQuery}>
      <PostContextProvider>
        <FullScreenModalContext.Provider value={showFullscreenModal}>
          <Content />
        </FullScreenModalContext.Provider>
      </PostContextProvider>
    </SearchQueryContext.Provider>
  )
}
