import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core';
import ImgThumb from './img-thumb/ImgThumb';
import Post from './../../../model/Post';

const styles = theme => ({
  borderedContainer: {
    //border: '1px solid white',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

class Exposition extends Component {

  constructor() {
    super();
    this.state = { postList: this.generarPosts() };
  }


  generarPosts = () => {
    let lista = [];
    for (let i = 1; i < 100; i++) {
      lista.push(new Post(i, "thumb_" + i, "full_" + i, new Blob(), new Blob()));
    }
    return lista;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.borderedContainer}>
        {this.state.postList.map((post, index) => { return (<ImgThumb post={post} key={"post_" + index} />) })}
      </div>
    )
  }
}

Exposition.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exposition)