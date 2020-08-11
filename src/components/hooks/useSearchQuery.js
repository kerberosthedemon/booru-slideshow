import { useState } from 'react';

export default function useSearchQuery() {
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(0);

  const addTag = (tag) => {
    setTags((oldTags) => {
      oldTags.push(tag);
      return oldTags;
    });
  }

  const addMultipleTags = (tags) => {
    setTags((oldTags) => {
      return oldTags.concat(tags);
    });
  }

  const removeLastTag = () => {
    let newTags = tags;
    newTags.pop();
    setTags((oldTags) => {
      return newTags;
    })
  }

  const removeTagAtIndex = (index) => {
    setTags((oldTags) => {
      return oldTags.filter((_, tagIndex) => tagIndex !== index);
    });
  }

  const addTagsFromString = (text) => {
    const tags = getTagsFromString(text);
    if (tags && tags.length > 0) {
      addMultipleTags(tags);
    }
  }

  const getTagsFromString = text => {
    let tags = text.split(' ');
    return tags.filter(t => t !== '');
  }

  const actions = { addTag, removeTagAtIndex, removeLastTag, addTagsFromString }

  return [tags, actions];
}