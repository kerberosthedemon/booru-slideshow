import React from 'react'
import { makeStyles } from '@material-ui/core';
import Header from './Header';
import Search from './../pages/search/Search';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    width: '100vw',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function Content() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <Search />
    </div>
  )
}
