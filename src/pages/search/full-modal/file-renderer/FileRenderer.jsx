import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  image: {
    maxWidth: '100%',
    margin: 'auto 0',
  },
  loadingScreen: {
    maxWidth: '100%',
    margin: 'auto 0',
  }
});

export default function FileRenderer({ selectedPost, customStyle }) {

  const classes = useStyles();

  if (!selectedPost.fullBlobURL)
    return <div className={classes.loadingScreen}>
      <Typography>{selectedPost.loadingPercentage}%</Typography>
    </div>

  switch (selectedPost.fileType) {
    case "webm":
    case "mp4":
      return <video autoPlay loop className={classes.image} controls key={`video_${selectedPost.id}`}>
        <source src={selectedPost.fullBlobURL} />
        Your browser does not support the video tag.
      </video>

    default:
      return <img className={classes.image}
        alt=""
        src={selectedPost ? selectedPost.fullBlobURL : "https://i.imgur.com/fdOtFO1.png"}
        style={customStyle} />
  }

}
