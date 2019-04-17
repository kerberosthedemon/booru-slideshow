import React, { Component } from "react";
import { Theme } from "./Theme";
import { MuiThemeProvider } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavBar from "./nav-bar/NavBar";
import SideNavBar from "./side-nav-bar/SideNavBar";
import { BrowserRouter, Route } from "react-router-dom";
import AppSettings from "./app-settings/AppSettings";
import Gallery from "./gallery/Gallery";
import FullDialog from "./gallery/full-dialog/FullDialog";
import SearchService from "./../services/SearchService";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: Theme.palette.background.default,
    padding: Theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      showSideNav: false,
      showDialog: false,
      postList: [],
      selectedPost: null,
      selectedServices: []
    };
    this.loading = false;
  }

  handleViewButtonClick = post => {
    this.setState({
      selectedPost: post,
      showDialog: true
    });
  };

  handleDialogClose = value => {
    this.setState({
      showDialog: false
    });
  };

  handleMenuClick = () => {
    this.setState(prevState => {
      return { showSideNav: !prevState.showSideNav };
    });
  };

  handleSearchSubmit = searchText => {
    this.setState({ postList: [] });

    this.state.selectedServices.forEach(async selectedService => {
      let newPostList = await selectedService.service.search(searchText);

      if (newPostList)
        this.setState(prevState => ({
          postList: prevState.postList.concat(newPostList)
        }));

      if (!this.loading) this.loadFullImages();
    });
  };

  loadFullImages = async () => {
    this.loading = true;
    const unloadedPost = this.state.postList.find(
      post => post.fullBlobURL === null
    );
    const blob = await SearchService.getFullBlobURL(unloadedPost);
    const blobURL = URL.createObjectURL(blob);
    this.setState(prevState => {
      prevState.postList.find(
        post => post.id === unloadedPost.id
      ).fullBlobURL = blobURL;
      return prevState;
    });

    if (this.state.postList.find(post => post.fullBlobURL === null))
      return await this.loadFullImages();
    else this.loading = false;
  };

  getMorePosts = async () => {
    this.state.selectedServices.forEach(async selectedService => {
      let newPostList = await selectedService.service.searchNextPage();

      if (newPostList)
        this.setState(prevState => ({
          postList: prevState.postList.concat(newPostList)
        }));

      if (!this.loading) this.loadFullImages();
    });
  };

  moveSelectedPostIndex = stepAmount => {
    let currentIndex = this.state.postList.findIndex(
      post => post.id === this.state.selectedPost.id
    );
    let newIndex = stepAmount + currentIndex;

    if (newIndex >= this.state.postList.length) {
      this.getMorePosts();
    }

    if (newIndex >= 0 && newIndex <= this.state.postList.length - 1) {
      let newCurrentPost = this.state.postList[newIndex];
      this.setState({ selectedPost: newCurrentPost });
    }

    document.getElementById("post_" + currentIndex).scrollIntoView();
  };

  handleToggleService = newSelectedServices => {
    this.setState({ selectedServices: newSelectedServices });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <BrowserRouter>
          <MuiThemeProvider theme={Theme}>
            <div className={classes.root}>
              <NavBar
                onMenuClick={this.handleMenuClick}
                onSearchSubmit={this.handleSearchSubmit}
                selectedServices={this.state.selectedServices}
                onToggleService={this.handleToggleService}
              />
              <SideNavBar active={this.state.showSideNav} />
              <main className={classes.content}>
                <div className={classes.toolbar} />

                <Route
                  exact
                  path="/"
                  render={() => (
                    <Typography noWrap>{"Pagina principal"}</Typography>
                  )}
                />
                <Route
                  exact
                  path="/gallery"
                  render={() => (
                    <Gallery
                      postList={this.state.postList}
                      onViewButtonClick={this.handleViewButtonClick}
                    />
                  )}
                />
                <Route exact path="/settings" component={AppSettings} />
              </main>
            </div>
            <FullDialog
              open={this.state.showDialog}
              selectedPost={this.state.selectedPost}
              onDialogClose={this.handleDialogClose}
              fullScreen
              moveSelectedPostIndex={this.moveSelectedPostIndex}
            />
          </MuiThemeProvider>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
