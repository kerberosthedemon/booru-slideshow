import { useState } from 'react';
import useTags from './useTags';

export default function useSearchQuery() {
  const [tags, tagActions] = useTags();
  const [page, setPage] = useState(0);

  const actions = { ...tagActions }

  return [tags, actions, page, setPage];
}