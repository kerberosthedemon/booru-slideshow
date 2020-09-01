import React, { createContext } from 'react'
import useSearchQuery from '../hooks/useSearchQuery';
import { PostContextProvider } from '../context/PostContextProvider';
import Content from './Content/Content';

export const SearchQueryContext = createContext({});

export default function App() {
  const searchQuery = useSearchQuery();

  return (
    <PostContextProvider>
      <SearchQueryContext.Provider value={searchQuery}>
        <Content />
      </SearchQueryContext.Provider>
    </PostContextProvider>
  )
}
