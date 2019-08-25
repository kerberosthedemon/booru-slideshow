import React from 'react'
import { makeStyles, DialogContent, Chip } from '@material-ui/core';
import { orange, purple, blue } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
  footer: {
    overflow: 'unset',
  },
  title: {
    textDecoration: 'underline',
    margin: '8px 0',
  },
  ratingSafe: {
    backgroundColor: blue['500'],
  },
  ratingQuestionable: {
    backgroundColor: orange['800'],
  },
  ratingExplicit: {
    backgroundColor: purple['A700'],
  },
}));

export default function TagsRenderer({ selectedPost }) {
  const classes = useStyles();

  const getRatingColor = (rating) => {
    switch (rating) {
      case "safe":
        return classes.ratingSafe;

      case "questionable":
        return classes.ratingQuestionable;

      case "explicit":
        return classes.ratingExplicit;

      default:
        return classes.ratingSafe;
    }
  };

  return (
    <DialogContent className={classes.footer}>
      <Typography variant="title" className={classes.title}>Rating:</Typography>
      <Chip
        label={selectedPost.rating}
        className={{ ...classes.chip, ...(getRatingColor(selectedPost.rating)) }}
      />
    </DialogContent>
  )
}
