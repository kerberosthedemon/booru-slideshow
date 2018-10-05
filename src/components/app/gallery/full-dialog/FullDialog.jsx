import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
  dialog: {
    color: 'red',
  },
  image: {
    alignSelf: 'center',
  },
})

class FullDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { selectedPost, classes, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <img className={classes.image} alt="" src={selectedPost ? selectedPost.fullURL : "https://static1.e621.net/data/sample/4e/e5/4ee5fcb87a4ec0235993ff580e049a31.jpg"} />

      </Dialog>
    );
  }
}

FullDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(FullDialog);