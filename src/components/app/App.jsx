import React, { Component } from 'react'
import { Theme } from './Theme';
import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavBar from './nav-bar/NavBar';
import SideNavBar from './side-nav-bar/SideNavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import AppSettings from './app-settings/AppSettings';
import Gallery from './gallery/Gallery';
import E621SearchService from './../model/search/E621SearchService';
import FullDialog from './gallery/full-dialog/FullDialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: Theme.palette.background.default,
    padding: Theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      showSideNav: false,
      postList: [],
      selectedPost: null,
      showDialog: false,
    }
    this.booruService = new E621SearchService();
  }

  handleViewButtonClick = (post) => {
    this.setState({
      selectedPost: post,
      showDialog: true,
    })
  }

  handleDialogClose = (value) => {
    this.setState({
      showDialog: false,
    })
  }

  handleMenuClick = () => {
    this.setState((prevState) => {
      return { showSideNav: !prevState.showSideNav };
    })
  }

  handleSearchSubmit = (searchText) => {
    this.booruService.search(searchText)
      .then((newPostList) => {
        if (newPostList) {
          this.setState((prevState) => {
            return { postList: prevState.postList.concat(newPostList) };
          })
        }
      })
  }

  handleKeyPress = (event) => {
    switch (event.key) {
      case 'a':
      case 'ArrowLeft':
        this.stepSelectedPicture(-1);
        break;

      case 'd':
      case 'ArrowRight':
        this.stepSelectedPicture(1);
        break;

      default:
        break;
    }
  }

  stepSelectedPicture(stepAmount) {
    let currentIndex = this.state.postList.findIndex(post => post.id === this.state.selectedPost.id);
    let newIndex = stepAmount + currentIndex;

    if (newIndex >= 0 && newIndex <= (this.state.postList.length - 1)) {
      let newCurrentPost = this.state.postList[newIndex];
      this.setState({ selectedPost: newCurrentPost });
    }

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <BrowserRouter>
          <MuiThemeProvider theme={Theme}>
            <div className={classes.root}>
              <NavBar onMenuClick={this.handleMenuClick} onSearchSubmit={this.handleSearchSubmit} />
              <SideNavBar active={this.state.showSideNav} />
              <main className={classes.content}>
                <div className={classes.toolbar} />


                <Route exact path="/" render={() => <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>} />
                <Route exact path="/gallery" render={() => <Gallery postList={this.state.postList} onViewButtonClick={this.handleViewButtonClick} />} />
                <Route exact path="/settings" component={AppSettings} />


              </main>
            </div>
            <FullDialog open={this.state.showDialog} selectedPost={this.state.selectedPost} onClose={this.handleDialogClose} fullScreen onKeyDown={this.handleKeyPress} />
          </MuiThemeProvider>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);