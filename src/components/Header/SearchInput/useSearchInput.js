
import { useBooruConfiguration } from '../../../hooks/useBooruConfiguration';
import { useState, useContext, useEffect } from 'react';
import { SearchQueryContext } from 'components/App';
import { PostListContext } from './../../../context/PostContextProvider';
import usePostLoadingQueue from 'hooks/usePostLoadingQueue';
import PostSearchMockService from './../../../services/Search/mock/PostSearchMockService';
//import { PostSearchService } from '../../../services/Search/PostSearchService';

const BACKSPACE_KEYCODE = 8;
const SPACE_KEYCODE = 32;
const ENTER_KEYCODE = 13;

export default function useSearchInput() {

  const searchService = new PostSearchMockService();
  const [configurations,] = useBooruConfiguration();

  const [inputText, setInputText] = useState('');
  const [canRemoveTags, setCanRemoveTags] = useState(false);
  const [tags, tagActions, page] = useContext(SearchQueryContext);
  const [, postListActions] = useContext(PostListContext);
  const [isSubmit, setIsSubmit] = useState(false);

  usePostLoadingQueue();

  const handleChange = event => {
    const text = event.target.value;
    setInputText(text);
  }

  const search = async (booruConfiguration) => {
    var posts = await searchService.search({ tags, page }, booruConfiguration);
    postListActions.setPostList(prevState => {
      const length = prevState.length;
      posts.forEach((p, index) => { p.index = index + length });
      return prevState.concat(posts)
    });
  }

  useEffect(() => {
    if (isSubmit) {
      configurations.forEach((config) => {
        if (config.isEnabled) {
          search(config);
        }
      });
    }

    return setIsSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {

    configurations.forEach((config) => {
      if (config.isEnabled) {
        search(config);
      }
    });


    return setIsSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


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
        if (inputText === '' && canRemoveTags) {
          tagActions.removeLastTag();
          setInputText('');
        }
        break;

      default:
        break;
    }

    if (inputText === '')
      setCanRemoveTags(true);
    else
      setCanRemoveTags(false);
  }

  const inputActions = { handleKeyUp, handleChange }

  return [tags, tagActions, inputText, inputActions]
}