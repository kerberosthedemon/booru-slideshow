import React from 'react';
import { createContext, useState } from 'react';
import useTags from '../hooks/useTags';

export const SearchTagsContext = createContext();
export const SearchPageContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const tagsState = useTags();
  const pageState = useState(0);

  return (
    <SearchTagsContext.Provider value={tagsState}>
      <SearchPageContext.Provider value={pageState}>
        {children}
      </SearchPageContext.Provider>
    </SearchTagsContext.Provider>
  );
}

