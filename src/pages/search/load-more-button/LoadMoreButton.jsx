import React, { useContext } from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { SearchQueryContext } from 'components/App';

const useStyles = makeStyles(theme => ({
  thumbnail: {
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
  },
}));

export default function LoadMoreButton() {

  const classes = useStyles();
  const [, , , setPage] = useContext(SearchQueryContext)

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <Paper className={classes.thumbnail} onClick={handleClick}>
      <Typography>Load More</Typography>
    </Paper>
  );
}