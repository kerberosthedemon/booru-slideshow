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
    overflow: 'hidden !important',
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
  constructor() {
    super();
    this.state = {
      explorationModeActive: false,
      scaleFactor: 1,
      translateFactor: { x: 0, y: 0 },
    }
  }

  handleClose = () => {
    this.resetImageTransform();
    this.props.onDialogClose();
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

  handleKeyPress = (event) => {
    if (event.key === 'c') {
      this.resetImageTransform();
      return;
    }

    if (this.explorationModeActive || event.key === 'q' || event.key === 'e') {
      this.explorationModeActive = true;
      this.handleExplorationMode(event);
    }
    else if (!this.explorationModeActive) {
      this.switchSelectedPicture(event);
    }

  }

  resetImageTransform = () => {
    this.setState({
      scaleFactor: 1,
      translateFactor: { x: 0, y: 0 },
    })

    this.explorationModeActive = false;
  }

  handleExplorationMode = (event) => {
    if (!this.scaleInterval) {
      switch (event.key) {
        case 'q':
          this.scaleImage(1); //usar setInterval() y clearInterval() para estas funciones
          break;

        case 'e':
          this.scaleImage(-1);
          break;
        default:
          break;
      }
    }

    if (!this.translateIntervalX) {
      switch (event.key) {
        case 'a':
          this.translateImageHorizontally(1)
          break;

        case 'd':
          this.translateImageHorizontally(-1)
          break;

        default:
          break;
      }
    }

    if (!this.translateIntervalY) {
      switch (event.key) {
        case 'w':
          this.translateImageVertically(1)
          break;

        case 's':
          this.translateImageVertically(-1)
          break;

        default:
          break;
      }
    }

  }

  scaleImage = (sign) => {
    this.scaleInterval = setInterval(() => {
      this.setState(
        (prevState) => {
          return { scaleFactor: prevState.scaleFactor += .02 * sign }
        })
    }, 5)
  }

  translateImageVertically = (sign) => {
    this.translateIntervalY = setInterval(() => {
      this.setState(
        (prevState) => {
          return { translateFactor: { x: prevState.translateFactor.x, y: prevState.translateFactor.y += .2 * sign } }
        })
    }, 5)
  }

  translateImageHorizontally = (sign) => {
    this.translateIntervalX = setInterval(() => {
      this.setState(
        (prevState) => {
          return { translateFactor: { x: prevState.translateFactor.x += .2 * sign, y: prevState.translateFactor.y } }
        })
    }, 5)
  }

  switchSelectedPicture = (event) => {
    switch (event.key) {
      case 'a':
      case 'ArrowLeft':
        this.props.moveSelectedPostIndex(-1);
        break;

      case 'd':
      case 'ArrowRight':
        this.props.moveSelectedPostIndex(1);
        break;

      default:
        break;
    }
  }

  handleKeyUp = (event) => {
    switch (event.key) {
      case 'q':
      case 'e':
        clearInterval(this.scaleInterval);
        this.scaleInterval = null;
        break;

      case 'w':
      case 's':
        clearInterval(this.translateIntervalY);
        this.translateIntervalY = null;
        break;

      case 'a':
      case 'd':
        clearInterval(this.translateIntervalX);
        this.translateIntervalX = null;
        break;

      case 'Escape': //Para Linux
        this.handleClose();
        break;

      default:
        break;
    }
  }

  switchComponent = () => {
    const { selectedPost, classes } = this.props;

    switch (selectedPost.fileType) {
      case "webm":
      case "mp4":
        return <video autoPlay loop className={classes.image} controls key={"video_" + selectedPost.id}>
          <source src={selectedPost.fullBlobURL} />
          Your browser does not support the video tag.
      </video>

      default:
        return <img className={classes.image} alt="" src={selectedPost ? selectedPost.fullBlobURL : "https://i.imgur.com/fdOtFO1.png"} style={{
          transform: 'scale(' + this.state.scaleFactor + ') '
            + 'translateX( ' + this.state.translateFactor.x + 'em ) '
            + 'translateY( ' + this.state.translateFactor.y + 'em ) ',
        }} />
    }
  }

  render() {
    const { selectedPost, classes, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.dialog} onKeyDown={this.handleKeyPress} onKeyUp={this.handleKeyUp}>

        <DialogContent className={classes.content}>
          {selectedPost && this.switchComponent()}
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
            <Typography variant="title" className={classes.title}>Rating:</Typography>
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