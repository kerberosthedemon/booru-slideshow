
import { useContext } from 'react';
import { PostListContext } from './../context/PostContextProvider';
import PostService from './../services/Post/PostService';
import { PostStatus } from 'model/Enums';

export default function usePostLoadingService(postQueue, removePostFromQueue) {
  const [, postListActions] = useContext(PostListContext);
  const postService = new PostService();

  const handleProgress = (progressEvent) => {
    const url = progressEvent.target.responseURL;
    const loadPercentage = calculateProgress(progressEvent);
    const postIndex = postQueue.findIndex(p => url.includes(p.fullURL) || url.includes(p.sampleURL));

    if (postIndex > -1) {
      const post = postQueue[postIndex];
      postListActions.setProgress(post.index, loadPercentage);
    }
  }

  const handleError = (error) => {
    alert(error);
  }

  const calculateProgress = (progressEvent) => {
    return Math.trunc(progressEvent.loaded * 100 / progressEvent.total);
  }

  const loadPost = async (post) => {
    postListActions.setPostList(prevState => {
      prevState[post.index].status = PostStatus.Loading;
      return prevState;
    });
    const blobURL = await postService.loadPost(post, handleProgress, handleError)
    postListActions.setPostList(prevState => {
      prevState[post.index].fullBlobURL = blobURL;
      prevState[post.index].status = PostStatus.Loaded;
      return prevState;
    });
    removePostFromQueue(post);
  }

  return loadPost;
}