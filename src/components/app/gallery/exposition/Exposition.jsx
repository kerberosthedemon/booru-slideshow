import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';
import ImgThumb from './img-thumb/ImgThumb';

const styles = theme => ({
  borderedContainer: {
    //border: '1px solid white',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
});

class Exposition extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.borderedContainer}>
        {this.props.postList.map((post, index) => { return (<ImgThumb post={post} key={"post_" + index} />) })}
      </div>
    )
  }
}

Exposition.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exposition)