import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Divider, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
  title: {
    textDecoration: 'underline',
    margin: '8px 0',
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

        <DialogContent className={classes.content}>
          <img className={classes.image} alt="" src={selectedPost ? selectedPost.fullURL : "https://i.imgur.com/fdOtFO1.png"} />
        </DialogContent>

        {
          selectedPost && selectedPost.tags &&
          <React.Fragment>
            <Divider />
            <DialogContent className={classes.footer}>
              <Typography variant="title" className={classes.title}>Tags:</Typography>
              {selectedPost.tags.map((tag, index) => {
                return (<Chip
                  label={tag}
                  key={"chip_" + index}
                  className={classes.chip}
                  color="primary"
                />)
              })}
            </DialogContent>
          </React.Fragment>
        }

        {
          selectedPost && selectedPost.tags &&
          <React.Fragment>
            <DialogContent className={classes.footer}>
              <Typography variant="title" className={classes.title}>Tags:</Typography>
              {selectedPost.tags.map((tag, index) => {
                return (<Chip
                  label={tag}
                  key={"chip_" + index}
                  className={classes.chip}
                  color="primary"
                />)
              })}
            </DialogContent>
          </React.Fragment>
        }



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