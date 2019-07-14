import React, { createContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Search from '../pages/search/Search';

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

export const PostListContext = createContext();

export default function App() {
  const classes = useStyles();
  const postList = useState([{}, {}]);

  return (
    <PostListContext.Provider value={postList}>
      <div className={classes.container}>
        <Header />
        <Search />
      </div>
    </PostListContext.Provider>
  )
}
