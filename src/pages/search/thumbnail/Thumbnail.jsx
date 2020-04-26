import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FullScreenModalContext, SelectedPostContext } from '../../../components/App';

const scaleAmount = 1.4;

const useStyles = makeStyles(theme => ({
  container: {
    width: '200px',
    height: '200px',
    display: 'flex',
    overflow: 'hidden',
    marginRight: '1rem'
  },
  horizontalImg: {
    cursor: 'pointer',
    flexGrow: 1,
    margin: '0 auto',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    transition: theme.transitions.create(['transform']),
    '&:hover': {
      transform: `translateX(-50%) scale(${scaleAmount})`,
    }
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
  }
}));

export default function Thumbnail({ post, selectPost, ...rest }) {

  const classes = useStyles();
  const [, setShowModal] = useContext(FullScreenModalContext);
  const [, setSelectedPost] = useContext(SelectedPostContext);

  const handleClick = () => {
    setShowModal(true);
    setSelectedPost(post);
  }

  return (
    <Paper className={classes.container} onClick={handleClick} {...rest}>
      <img className={post.isVerticallyDisplayed ? classes.verticalImg : classes.horizontalImg} alt="" src={post.thumbURL}></img>
    </Paper>
  )
}
