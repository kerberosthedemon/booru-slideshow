import React from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: '200px',
    height: '200px',
    display: 'flex'
  },
  img: {
    flexGrow: 1,
    margin: 'auto 0'
  }
}));

export default function Thumbnail({ post }) {

  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <img className={classes.img} alt="" src="https://i.ytimg.com/vi/stdrVr9BHkE/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCNV2wtXJSWArm6mXlglEKNQM5PEg"></img>
    </Paper>
  )
}
