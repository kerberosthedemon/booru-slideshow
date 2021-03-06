import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FullScreenModalContext, SelectedPostIndexContext } from '../../../components/App';

const scaleAmount = 1.4;

const useStyles = makeStyles(theme => ({
  container: {
    width: '200px',
    height: '200px',
    display: 'flex',
    overflow: 'hidden',
    marginRight: '.4rem',
    marginBottom: '.5rem',
    '&:hover': {
      boxShadow: '0px 0px 8px 2px rgba(66,173,162,1)'
    },
    alignItems: 'center',
  },
  containerFix: {
    flexDirection: 'column',
  },
  horizontalImg: {
    cursor: 'pointer',
    height: '100%',
    flexGrow: 1,
    margin: '0 auto',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    transition: theme.transitions.create(['transform']),
    '&:hover': {
      transform: `translateX(-50%) scale(${scaleAmount})`,
    },

  },
  horizontalFix: {
    marginTop: '-18px'
  },
  verticalImg: {
    cursor: 'pointer',
    width: '100%',
    margin: 'auto 0',
    marginTop: '50%',
    transform: 'translateY(-50%)',
    transition: theme.transitions.create(['transform']),
    '&:hover': {
      transform: `translateY(-50%) scale(${scaleAmount})`,
    }
  },
  verticalFix: {
    marginTop: 'calc(50% - 18px) !important',
  },
  percentageText: {
    zIndex: 100,
    backgroundColor: 'black',
  }
}));

export default function Thumbnail({ post, index }) {

  const classes = useStyles();
  const [, setShowModal] = useContext(FullScreenModalContext);
  const [, setSelectedPostIndex] = useContext(SelectedPostIndexContext);

  const handleClick = () => {
    setShowModal(true);
    setSelectedPostIndex(index);
  }

  return (
    <Paper className={`${classes.container} ${post.fullBlobURL ? '' : classes.containerFix}`} onClick={handleClick}>
      {!post.fullBlobURL && <div className={classes.percentageText}>{post.loadingPercentage}%</div>}
      <img
        className={
          `${post.isVerticalLayout ?
            (classes.verticalImg + (post.fullBlobURL ? '' : ` ${classes.verticalFix}`))
            : (classes.horizontalImg + (post.fullBlobURL ? '' : ` ${classes.horizontalFix}`))}`
        }
        alt=""
        src={post.thumbURL} />
    </Paper>
  )
}
