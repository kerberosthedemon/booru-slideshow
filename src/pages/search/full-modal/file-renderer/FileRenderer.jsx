import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  image: {
    height: '100%',
    margin: 'auto',
  },
  loadingScreenContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  loadingScreen: {
    margin: 'auto'
  }
});

export default function FileRenderer({ selectedPost, transform }) {

  const classes = useStyles();

  if (!selectedPost.fullBlobURL)
    return (
      <div className={classes.loadingScreenContainer}>
        <Typography className={classes.loadingScreen}>{selectedPost.loadingPercentage}%</Typography>
      </div>)

  switch (selectedPost.fileType) {
    case "webm":
    case "mp4":
      return (
        <div className={classes.loadingScreenContainer}>
          <video autoPlay loop className={classes.image} controls key={`video_${selectedPost.id}`}>
            <source src={selectedPost.fullBlobURL} />
          Your browser does not support the video tag.
        </video>
        </div>);

    default:
      return <div className={classes.loadingScreenContainer}>
        <img className={classes.image}
          alt=""
          src={selectedPost.fullBlobURL}
          style={{
            transform: `translateX(${transform.posX}px) 
                        translateY(${transform.posY}px) 
                        scale(${transform.zoom})`
          }} />
      </div>
  }

}
