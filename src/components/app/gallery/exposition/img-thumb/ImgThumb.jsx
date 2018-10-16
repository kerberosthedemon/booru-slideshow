import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { withStyles, Button, Fade } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReplyIcon from '@material-ui/icons/Reply';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = theme => ({
  componentContainer: {
    //border: '1px solid white',
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: '1px',
    marginBottom: '1px',
    cursor: 'pointer',
    transition: 'transform .1s',
    overflow: 'hidden',
    '&:hover img': {
      transform: 'translateY(-3.5em) scale(1.3)',
      filter: 'opacity(.7)',
    },
    '&:hover button': {
      transform: 'translateY(5em)',
      filter: 'opacity(1)',
    },
    '&:hover div': {
      transform: 'translateY(calc(7em + 5px))',
    },
    '&:hover svg': {
      transform: 'translateY(0)',
      filter: 'opacity(1)',
      transition: 'all .3s',
    },
    '&:hover svg:nth-child(1)': {
      transitionDelay: '.2s',
    },
    '&:hover svg:nth-child(2)': {
      transitionDelay: '.3s',
    },
    '&:hover svg:nth-child(3)': {
      transitionDelay: '.4s',
    },
  },
  text: {
    margin: 'auto',
  },
  contentContainer: {
    display: 'flex',
    flexGrow: 1,
  },
  image: {
    transition: 'transform .4s, filter .15s',
    transform: 'translateY(-5.8em)',
  },
  footerContainer: {
    zIndex: 1000,
    padding: '7px 0px',
    borderRadius: '0',
    width: '100%',
    textAlign: 'end',
    transition: 'transform .4s',
    transform: 'translateY(calc(10em + 5px))',
    background: 'linear-gradient(45deg, #f6356f 0%,#ff5f50 100%)',
    border: theme.palette.background.paper,
    borderWidth: '5px',
    borderStyle: 'solid',
  },
  button: {
    zIndex: 1000,
    transition: 'transform .2s, filter .15s',
    filter: 'opacity(0)',
    transform: 'translateY(8em)',
    borderRadius: '0',
    width: '7em',
  },
  icons: {
    //fontSize: '1.3em',
    color: theme.palette.text.primary,
    margin: '0 .4em',
    transform: 'translateY(.5em)',
    transition: 'all .1s',
    filter: 'opacity(0)',
  },
});

class ImgThumb extends Component {
  state = { show: false };

  componentDidMount() {
    this.setState({ show: true });
  }

  handleClick = () => {
    this.props.onViewButtonClick(this.props.post);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fade in={this.state.show} style={{ transitionDelay: this.state.show ? 500 : 0 }} mountOnEnter unmountOnExit>
        <div className={classes.componentContainer}>
          <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick}>View</Button>
          <div className={classes.footerContainer}>
            <ReplyIcon className={classes.icons} />
            <GetAppIcon className={classes.icons} />
            <StarBorderIcon className={classes.icons} />
          </div>
          <img alt="" src={this.props.post.fullURL} className={classes.image} style={this.props.post.isVerticalLayout() ? { width: '110%' } : { minHeight: '110%' }} onClick={this.handleClick} />
        </div>
      </Fade>
    )
  }
}

ImgThumb.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgThumb)