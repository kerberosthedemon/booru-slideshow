
import PostSearchMockService from './../../../services/Search/mock/PostSearchMockService';
import { useBooruConfiguration } from '../../../hooks/useBooruConfiguration';
import { useState, useContext, useEffect } from 'react';
import { SearchQueryContext } from 'components/App';
import { PostListContext } from './../../../context/PostContextProvider';
import usePostLoadingQueue from 'hooks/usePostLoadingQueue';
import { PostSearchService } from '../../../services/Search/PostSearchService';

export default function useSearchInput() {
  const BACKSPACE_KEYCODE = 8;
  const SPACE_KEYCODE = 32;
  const ENTER_KEYCODE = 13;

  const searchService = new PostSearchService();
  const [configurations, configActions] = useBooruConfiguration();

  const [inputText, setInputText] = useState('');
  const [textChanged, setTextChanged] = useState(false);
  const [tags, tagActions] = useContext(SearchQueryContext);
  const [, postListActions] = useContext(PostListContext);
  const [isSubmit, setIsSubmit] = useState(false);

  usePostLoadingQueue();

  const handleChange = event => {
    const text = event.target.value;
    setInputText(text);
  }

  useEffect(() => {
    const search = async (booruConfiguration) => {
      var posts = await searchService.search({ tags, page: 0 }, booruConfiguration);
      postListActions.setPostList(prevState => {
        const length = prevState.length;
        posts.forEach((p, index) => { p.index = index + length });
        return prevState.concat(posts)
      });
    }

    if (isSubmit) {
      configurations.forEach((config) => {
        if (config.isEnabled) {
          search(config);
        }
      });
    }
  }, [tags]);


  const handleKeyUp = event => {

    switch (event.keyCode) {
      case SPACE_KEYCODE:
        tagActions.addTagsFromString(inputText);
        setInputText('');
        break;

      case ENTER_KEYCODE:
        tagActions.addTagsFromString(inputText);
        setIsSubmit(true)
        setInputText('')
        break;

      case BACKSPACE_KEYCODE:
        if (inputText === '') {
          tagActions.removeLastTag();
          setInputText('');
        }
        break;

      default:
        break;
    }

    setTextChanged(false);
  }

  const inputActions = { handleKeyUp, handleChange }

  return [tags, tagActions, inputText, inputActions]
}