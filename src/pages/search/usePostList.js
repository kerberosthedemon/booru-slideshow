import { useState, useContext, useEffect } from 'react';
import { PostListContext } from './../../context/PostContextProvider';
import PostMockService from './../../services/Post/mock/PostMockService';

export default function usePostList() {

  const postService = new PostMockService();
  const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useContext(PostListContext);

  const [loadingPost, setLoadingPost] = useState(false);

  const loadPost = async (post, index) => {
    const blobURL = await postService.loadPost(post, (progressEvent) => handleProgress(index, progressEvent), handleError);
    setPostList(prevState => {
      prevState[index].fullBlobURL = blobURL;
      return prevState;
    });
    if (postList[index + 1]) {
      loadPost(postList[index + 1], index + 1);
    } else {
      setLoadingPost(false);
    }
  }

  const handleProgress = (index, progressEvent) => {
    if (postList) {
      setPostList(prevState => {
        let newPostList = [];
        prevState[index].loadingPercentage = calculateProgress(progressEvent);
        newPostList = newPostList.concat(prevState);
        return newPostList;
      });
    }
  }

  const calculateProgress = (progressEvent) => {
    return Math.trunc(progressEvent.loaded * 100 / progressEvent.total);
  }

  const handleError = (error) => {
    alert(error.message);
  }

  useEffect(() => {
    if (postList.length !== postCount && !loadingPost) {
      setLoadingPost(true);
      loadPost(postList[0], 0);
    }

    return () => {
      setPostCount(postList.length);
    }
  }, [postList])

  return postList;

}