import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Divider, Chip } from '@material-ui/core';

const styles = theme => ({
  dialog: {

  },
  image: {
    maxWidth: '100%',
    margin: 'auto 0',
  },
  content: {
    overflow: 'auto !important',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px !important',
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100% - 48px)',
    alignItems: 'center',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  footer: {
    overflow: 'unset',
  },
})

class FullDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { selectedPost, classes, ...other } = this.props;

    let tags;

    if (selectedPost) {
      tags = selectedPost.tags.map((tag, index) => {
        return (<Chip
          label={tag}
          key={"chip_" + index}
          className={classes.chip}
          color="primary"
        />)
      });
    }

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>

        <DialogContent className={classes.content}>
          <img className={classes.image} alt="" src={selectedPost ? selectedPost.fullURL : "https://i.imgur.com/fdOtFO1.png"} />
        </DialogContent>

        <Divider />
        <DialogContent className={classes.footer}>
          {tags}
        </DialogContent>
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