
import { useState, useEffect, useContext } from 'react';
import { PostListContext } from '../context/PostContextProvider';
import useAppConfiguration from './useAppConfiguration';
import { PostStatus } from 'model/Enums';

export default function usePostLoadingQueue() {
  const config = useAppConfiguration();
  let lastIndex = 0;

  const [postList,] = useContext(PostListContext);
  const [postListQueue, setQueue] = useState([]);
  //const loadPost = usePostLoadService();

  const queueFreeSpaces = () => config.maxPostQueue - postListQueue.length;
  const canAddToQueue = () => queueFreeSpaces() > 0 && postList[lastIndex + 1];

  // secuentially adds posts to the queue as the previous complete loading 
  // then starts the loading process
  useEffect(() => {

    if (canAddToQueue()) {
      addToQueue(queueFreeSpaces());
      return;
    }

    const postsNotLoaded = postListQueue.filter(p => p.status)
    postsNotLoaded.forEach(post => {
      //loadPost(post);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postListQueue])

  const addToQueue = amount => {
    setQueue(prevQueue => {
      const unloadedPosts = postList.filter(p => p.status === PostStatus.Unloaded);
      const postsToLoad = unloadedPosts.slice(lastIndex + 1, amount);
      if (postsToLoad.length > 0) {
        lastIndex = postsToLoad.map(p => p.index).max();
        prevQueue.concat(postsToLoad);
      }
      return prevQueue;
    })
  }

  const startLoadingQueue = () => {
    if (postListQueue.length === 0 && canAddToQueue()) {
      addToQueue(config.maxPostQueue);
    }
  }

  return startLoadingQueue;
}