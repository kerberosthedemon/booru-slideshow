import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { PostListContext, FullScreenModalContext, SelectedPostIndexContext } from '../../components/App';
import Thumbnail from './thumbnail/Thumbnail';
import FullModal from './full-modal/FullModal';
import PostService from '../../components/services/Post/PostService';

const useStyles = makeStyles(theme => ({
  container: {
    //backgroundColor: 'red',
    flexGrow: 1,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto'
  }
}))

export default function SearchPage() {
  const postService = new PostService();
  const classes = useStyles();
  const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useContext(PostListContext);
  const [showModal, setShowModal] = useContext(FullScreenModalContext);

  const handleClose = () => {
    setShowModal(false);
  }

  const loadPost = async (post, index) => {
    const blobURL = await postService.loadPost(post, (progressEvent) => handleProgress(index, progressEvent), handleError);
    setPostList(prevState => {
      prevState[index].fullBlobURL = blobURL;
      return prevState;
    });
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
    if (postList.length !== postCount) {
      loadPost(postList[0], 0);
    }

    return () => {
      setPostCount(postList.length);
    }
  }, [postList])

  return (
    <React.Fragment>
      <div className={classes.container}>
        {postList.map && postList.map((post, index) => <Thumbnail post={post} index={index} key={`thumbnail_${index}`} />)}
      </div>
      <FullModal open={showModal} onClose={handleClose} />
    </React.Fragment>
  )
}
