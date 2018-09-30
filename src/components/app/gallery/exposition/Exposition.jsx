import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  borderedContainer: {
    border: '1px solid white',
  },
});

class Exposition extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.borderedContainer}>
        This is the Exposition component
      </div>
    )
  }
}

Exposition.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exposition)