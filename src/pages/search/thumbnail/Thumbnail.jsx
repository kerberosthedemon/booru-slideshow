import React from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
      transform: 'translateX(-50%) scale(2)',
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
      transform: 'translateY(-50%) scale(2)',
    }
  }
}));

export default function Thumbnail({ post }) {

  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <img className={post.isVerticallyDisplayed ? classes.verticalImg : classes.horizontalImg} alt="" src={post.thumbURL}></img>
    </Paper>
  )
}
