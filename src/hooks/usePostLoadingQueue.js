
import { useState, useEffect, useContext } from 'react';
import { PostListContext } from '../context/PostContextProvider';
import useAppConfiguration from './useAppConfiguration';
import { PostStatus } from 'model/Enums';
import usePostLoadingService from './usePostLoadingService';
import useArrayStateWithCallback from './useArrayStateWithCallback';

export default function usePostLoadingQueue() {
  const config = useAppConfiguration();
  const [lastIndex, setLastIndex] = useState(0);

  const [postList,] = useContext(PostListContext);

  const [postListQueue, setQueue] = useState([]);

  const removePostFromQueue = (post) => {
    if (postListQueue.find(postInQueue => postInQueue.index === post.index))
      setQueue(prev => prev.filter(p => p.index !== post.index))
  }

  const loadPost = usePostLoadingService(postListQueue, removePostFromQueue);

  const queueFreeSpaces = () => config.maxPostQueue - postListQueue.length;
  const canAddToQueue = () => queueFreeSpaces() > 0 && postList[lastIndex];

  // secuentially adds posts to the queue as the previous complete loading 
  // then starts the loading process
  useEffect(() => {

    if (canAddToQueue()) {
      addToQueue(queueFreeSpaces());
      return;
    }

    const postsNotLoaded = postListQueue.filter(p => {
      return p.status === 1;
    })
    postsNotLoaded.forEach(post => {
      loadPost(post);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postListQueue])

  const addToQueue = amount => {
    setQueue(prevQueue => {
      const unloadedPosts = postList.filter(p => p.status === PostStatus.Unloaded
        && !prevQueue.find(
          queuePost => queuePost.index === p.index
        ));
      const postsToLoad = unloadedPosts.slice(0, amount);
      if (postsToLoad.length > 0) {
        const indexes = postsToLoad.map(p => p.index);
        setLastIndex(Math.max(...indexes) + 1);
        prevQueue = prevQueue.concat(postsToLoad);
      }
      return prevQueue;
    })
  }

  const startLoadingQueue = () => {
    if (postListQueue.length === 0 && canAddToQueue()) {
      addToQueue(config.maxPostQueue);
    }
  }

  useArrayStateWithCallback(postList, startLoadingQueue);

  return startLoadingQueue;
}