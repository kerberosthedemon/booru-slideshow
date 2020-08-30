
import { useContext } from 'react';
import { PostListContext } from './../context/PostContextProvider';
import PostService from './../services/Post/PostService';

export default function usePostLoadingService(postQueue) {
  const [, postListActions] = useContext(PostListContext);
  const postService = new PostService();

  const handleProgress = (progressEvent) => {
    const url = progressEvent.target.responseURL;
    const loadPercentage = calculateProgress(progressEvent);
    const postIndex = postQueue.findIndex(p => url.includes(p.fullURL) || url.includes(p.sampleURL));

    if (postIndex > -1) {
      postListActions.setProgress(postIndex, loadPercentage);
    }
  }

  const handleError = (error) => {
    alert(error);
  }

  const calculateProgress = (progressEvent) => {
    return Math.trunc(progressEvent.loaded * 100 / progressEvent.total);
  }

  const loadPost = (post) => {
    postService.loadPost(post, handleProgress, handleError)
  }

  return loadPost;
}