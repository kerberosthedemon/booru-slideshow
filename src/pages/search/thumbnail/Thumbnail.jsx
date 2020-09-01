import React, { useContext } from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SelectedPostIndexContext } from 'context/PostContextProvider';
import { PostStatus } from 'model/Enums';

const useStyles = makeStyles(theme => ({
  thumbnail: {
    // width: '200px',
    // height: '200px',
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: theme.transitions.create(['background-size']),
    '&:hover': {
      boxShadow: '0px 0px 8px 2px rgba(66,173,162,1)',
      backgroundSize: '150%',
    },
    cursor: 'pointer',
    // margin: theme.spacing(1)
  },
  loaderContainer: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    alignItems: 'center',
    justifyItems: 'center'
  },
  percentageText: {
    zIndex: 1,
    gridColumn: '1/2',
    gridRow: '1/2'
  },
  spinner: {
    gridColumn: '1/2',
    gridRow: '1/2'
  },
  background: {
    backgroundColor: '#0000007a',
    gridColumn: '1/2',
    gridRow: '1/2',
    height: '100%',
    width: '100%'
  },
  circularProgress: {
    animationDuration: "550ms",
  }
}));

export default function Thumbnail({ post, index, modalActions }) {

  const classes = useStyles();
  const [, setSelectedPostIndex] = useContext(SelectedPostIndexContext);

  const handleClick = () => {
    setSelectedPostIndex(index);
    modalActions.openModal();
  }

  return (
    <Paper className={classes.thumbnail} style={{ backgroundImage: `url(${post.thumbURL})` }} onClick={handleClick}>
      {
        !post.fullBlobURL &&
        (
          <div className={classes.loaderContainer}>
            {post.status === PostStatus.Loading && <div className={classes.percentageText}>{post.loadingPercentage}%</div>}
            {post.status === PostStatus.Loading && <div className={classes.spinner}><CircularProgress className={classes.circularProgress} disableShrink color="secondary" size={60} /></div>}
            <div className={classes.background}></div>
          </div>
        )
      }
    </Paper>
  )
}
