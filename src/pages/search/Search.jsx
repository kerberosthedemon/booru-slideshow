import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { PostListContext, FullScreenModalContext } from './../../components/App';
import Thumbnail from './thumbnail/Thumbnail';
import FullModal from './full-modal/FullModal';

const useStyles = makeStyles(theme => ({
  container: {
    //backgroundColor: 'red',
    flexGrow: 1,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  }
}))

export default function Search() {
  const classes = useStyles();
  const [postList] = useContext(PostListContext);
  const [showModal, setShowModal] = useContext(FullScreenModalContext);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        {postList.map(post => <Thumbnail post={post} onClick={toggleModal} />)}
      </div>
      <FullModal open={showModal} onClose={toggleModal} />
    </React.Fragment>
  )
}
