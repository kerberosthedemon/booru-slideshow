import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Thumbnail from './thumbnail/Thumbnail';
import FullModal from './full-modal/FullModal';
import useModal from './useModal';
import { PostListContext } from 'context/PostContextProvider';
import LoadMoreButton from './load-more-button/LoadMoreButton';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    overflow: 'auto',
  },
  grid: {
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fill, minmax(8rem, 1fr))',
    'grid-auto-rows': '1fr',
    gridGap: theme.spacing(1),
    padding: theme.spacing(2),
    '&::before': {
      content: '""',
      width: '0',
      'padding-bottom': '100%',
      'grid-row': '1 / 1',
      'grid-column': '1 / 1',
    },
    '& > :first-child': {
      'grid-row': '1 / 1',
      'grid-column': '1 / 1',
    }
  },
  firstChild: {
    'grid-row': '1 / 1',
    'grid-column': '1 / 1',
  }
}))

export default function SearchPage() {

  const classes = useStyles();

  const [showModal, modalActions] = useModal();
  const [postList,] = useContext(PostListContext);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.grid}>
          {postList.map && postList.map((post, index) => <Thumbnail post={post} index={index} key={`thumbnail_${index}`} modalActions={modalActions} />)}
          {postList.length > 0 && <LoadMoreButton />}
        </div>
      </div>
      <FullModal open={showModal} onClose={modalActions.closeModal} />
    </React.Fragment>
  )
}
