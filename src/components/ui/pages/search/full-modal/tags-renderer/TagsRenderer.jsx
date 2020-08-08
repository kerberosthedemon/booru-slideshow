import React from 'react'
import { makeStyles, DialogContent, Chip, Grid } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    borderStyle: 'solid',
    borderColor: '#222',
    padding: '0px 5px',
    marginTop: '5px',
    backgroundColor: '#222',
    borderRadius: 4,
  },
  chip: {
    margin: theme.spacing(1),
  },
  footer: {
    overflow: 'unset',
  },
  title: {
    margin: '8px 0',
  },
  blueBackground: {
    backgroundColor: colors.blue['500'],
  },
  orangeBackground: {
    backgroundColor: colors.orange['800'],
  },
  redBackground: {
    backgroundColor: colors.red['A400'],
  },
  purpleBackground: {
    backgroundColor: colors.purple['A700']
  },
  greenBackground: {
    backgroundColor: colors.green['600']
  },
  pinkBackground: {
    backgroundColor: colors.pink['900']
  }
}));

export default function TagsRenderer({ selectedPost }) {
  const classes = useStyles();

  const getRatingColor = (rating) => {
    switch (rating) {
      case "safe":
        return classes.blueBackground;

      case "questionable":
        return classes.orangeBackground;

      case "explicit":
        return classes.redBackground;

      default:
        return classes.ratingSafe;
    }
  };

  const tagSection = (title, tags, extraClass) => {
    return (tags.length > 0 &&
      <Grid item className={classes.container}>
        <Typography className={classes.title}>{title}</Typography>
        {tags.map((tag, index) => (
          <Chip label={tag} key={`tag_${title}_${index}`} className={extraClass ? `${classes.chip} + ${extraClass}` : classes.chip} />
        ))}
      </Grid>
    );
  }

  const ratingSection = () => {
    const chipColorClass = getRatingColor(selectedPost.rating);
    return tagSection('Rating:', [selectedPost.rating], chipColorClass);
  };

  return (
    <DialogContent className={classes.footer}>
      <Grid container direction="column" justify="space-evenly" alignItems="stretch">
        {ratingSection()}
        {tagSection('Artist:', selectedPost.artists, classes.purpleBackground)}
        {tagSection('Characters:', selectedPost.charactersTags, classes.greenBackground)}
        {tagSection('Species:', selectedPost.speciesTags, classes.orangeBackground)}
        {tagSection('Copyright:', selectedPost.copyrightTags, classes.pinkBackground)}
        {tagSection('Tags:', selectedPost.tags, classes.blueBackground)}
      </Grid>
    </DialogContent>
  )
}
