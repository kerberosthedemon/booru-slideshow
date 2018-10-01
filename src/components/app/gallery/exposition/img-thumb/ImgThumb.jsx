import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  bordered: {
    //border: '1px solid white',
    width: 150,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginRight: '1px',
    marginBottom: '1px',
    cursor: 'pointer',
    transition: 'transform .1s',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  text: {
    margin: 'auto'
  }
});

class ImgThumb extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.bordered} style={{ backgroundImage: 'url(' + this.props.post.thumbURL + ')' }}>
        <Typography className={classes.text}>Esta es una Imagen</Typography>
      </div>
    )
  }
}

ImgThumb.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgThumb)