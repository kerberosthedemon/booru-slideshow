import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  borderedContainer: {
    border: '1px solid white',
    flexGrow: 1,
  },
});

class Slideshow extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.borderedContainer}>
      </div>
    )
  }
}

Slideshow.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Slideshow)