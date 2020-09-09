import React, { createContext } from 'react'
import { PostContextProvider } from '../context/PostContextProvider';
import Content from './Content/Content';
import { SearchContextProvider } from 'context/SearchQueryContextProvider';

export const SearchQueryContext = createContext({});

export default function App() {

  return (
    <PostContextProvider>
      <SearchContextProvider>
        <Content />
      </SearchContextProvider>
    </PostContextProvider>
  )
}
