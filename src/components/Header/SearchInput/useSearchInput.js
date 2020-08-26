
import PostSearchMockService from './../../../services/Search/mock/PostSearchMockService';
import { useConfiguration } from './../../../hooks/useConfiguration';
import { useState, useContext, useEffect } from 'react';
import { SearchQueryContext } from 'components/App';
import { PostListContext } from './../../../context/PostContextProvider';

export default function useSearchInput() {
  const BACKSPACE_KEYCODE = 8;
  const SPACE_KEYCODE = 32;
  const ENTER_KEYCODE = 13;

  const searchService = new PostSearchMockService();
  const [configurations, configActions] = useConfiguration();

  const [inputText, setInputText] = useState('');
  const [textChanged, setTextChanged] = useState(false);
  const [tags, tagActions] = useContext(SearchQueryContext);
  const [, setPostList] = useContext(PostListContext);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = event => {
    const text = event.target.value;
    setInputText(text);
  }

  useEffect(() => {
    const search = async (booruConfiguration) => {
      var posts = await searchService.search({ tags, page: 0 }, booruConfiguration);
      setPostList(prevState => prevState.concat(posts));
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