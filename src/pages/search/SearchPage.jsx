import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Thumbnail from './thumbnail/Thumbnail';
import FullModal from './full-modal/FullModal';
import useModal from './useModal';
import usePostList from './usePostList';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto'
  }
}))

export default function SearchPage() {

  const classes = useStyles();

  const [showModal, modalActions] = useModal();
  const postList = usePostList();

  return (
    <React.Fragment>
      <div className={classes.container}>
        {postList.map && postList.map((post, index) => <Thumbnail post={post} index={index} key={`thumbnail_${index}`} modalActions={modalActions} />)}
      </div>
      <FullModal open={showModal} onClose={modalActions.closeModal} />
    </React.Fragment>
  )
}
