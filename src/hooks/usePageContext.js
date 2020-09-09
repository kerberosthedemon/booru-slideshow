
import { useContext } from 'react';
import { SearchPageContext } from 'context/SearchQueryContextProvider';

export default function usePageContext() {
  return useContext(SearchPageContext);
}