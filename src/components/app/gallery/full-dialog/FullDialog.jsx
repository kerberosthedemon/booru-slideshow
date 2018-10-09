import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Divider, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

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
  ratingSafe: {
    backgroundColor: blue['500'],
  },
  ratingQuestionable: {
    backgroundColor: orange['800'],
  },
  ratingExplicit: {
    backgroundColor: purple['A700'],
  },
})

class FullDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  getRatingColor = (post) => {
    const { classes } = this.props;

    switch (post) {
      case "safe":
        return classes.ratingSafe;

      case "questionable":
        return classes.ratingQuestionable;

      case "explicit":
        return classes.ratingExplicit;

      default:
        return classes.ratingSafe;
    }
  }

  render() {
    const { selectedPost, classes, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog}>

        <DialogContent className={classes.content}>
          <img className={classes.image} alt="" src={selectedPost ? selectedPost.fullURL : "https://i.imgur.com/fdOtFO1.png"} />
        </DialogContent>

        {
          selectedPost && selectedPost.artists &&
          <React.Fragment>
            <Divider />
            <DialogContent className={classes.footer}>
              <Typography variant="title" className={classes.title}>Artists:</Typography>
              {selectedPost.artists.map((artist, index) => {
                return (<Chip
                  label={artist}
                  key={"artist_" + index}
                  className={classes.chip}
                  color="secondary"
                />)
              })}
            </DialogContent>
          </React.Fragment>
        }

        {
          selectedPost && selectedPost.rating &&
          <DialogContent className={classes.footer}>
            <Typography variant="title" className={classes.title}>Artists:</Typography>
            <Chip
              label={selectedPost.rating}
              className={classes.chip + " " + this.getRatingColor(selectedPost.rating)}
            />
          </DialogContent>
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