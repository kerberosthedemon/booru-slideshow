import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    width: '100vw',
    color: theme.palette.text.primary
  }
}));

export default function App() {
  const classes = useStyles();


  return (
    <div className={classes.container}>
      <Header />
    </div>
  )
}
