import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { PostListContext, FullScreenModalContext } from '../../components/App';
import Thumbnail from './thumbnail/Thumbnail';
import FullModal from './full-modal/FullModal';

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
  const classes = useStyles();
  const [postList] = useContext(PostListContext);
  const [showModal, setShowModal] = useContext(FullScreenModalContext);

  const toggleModal = () => {
    setShowModal(false);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        {postList.map((post, index) => <Thumbnail post={post} key={`thumbnail_${index}`} />)}
      </div>
      <FullModal open={showModal} onClose={toggleModal} />
    </React.Fragment>
  )
}
