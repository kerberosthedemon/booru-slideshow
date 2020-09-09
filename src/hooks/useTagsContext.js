
import { useContext } from 'react';
import { SearchTagsContext } from 'context/SearchQueryContextProvider';

export default function useTagsContext() {
  return useContext(SearchTagsContext);
}