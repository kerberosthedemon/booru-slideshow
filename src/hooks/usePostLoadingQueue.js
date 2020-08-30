
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
  const loadPost = usePostLoadingService(postListQueue);

  const queueFreeSpaces = () => config.maxPostQueue - postListQueue.length;
  const canAddToQueue = () => queueFreeSpaces() > 0 && postList[lastIndex];

  // secuentially adds posts to the queue as the previous complete loading 
  // then starts the loading process
  useEffect(() => {

    if (canAddToQueue()) {
      addToQueue(queueFreeSpaces());
      return;
    }

    const postsNotLoaded = postListQueue.filter(p => p.status)
    postsNotLoaded.forEach(post => {
      loadPost(post);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postListQueue])

  const addToQueue = amount => {
    setQueue(prevQueue => {
      const unloadedPosts = postList.filter(p => p.status === PostStatus.Unloaded);
      const postsToLoad = unloadedPosts.slice(lastIndex, amount);
      if (postsToLoad.length > 0) {
        const indexes = postsToLoad.map(p => p.index);
        setLastIndex(Math.max(indexes) + 1);
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