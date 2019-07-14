import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { PostListContext } from './../../components/App';
import Thumbnail from './thumbnail/Thumbnail';

const useStyles = makeStyles(theme => ({
  container: {
    //backgroundColor: 'red',
    flexGrow: 1,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  }
}))

export default function Search() {
  const classes = useStyles();
  const [postList] = useContext(PostListContext);

  return (
    <div className={classes.container}>
      {postList.map(post => <Thumbnail post={post} />)}
    </div>
  )
}
