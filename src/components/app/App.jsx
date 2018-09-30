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
import MyGallery from './my-gallery/MyGallery';
import Gallery from './gallery/Gallery';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['900'],
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {

  constructor() {
    super();
    this.state = { showSideNav: false, }
    this.referencia = React.createRef();
  }


  handleMenuClick = () => {
    this.setState((prevState) => {
      return { showSideNav: !prevState.showSideNav };
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <BrowserRouter>
          <MuiThemeProvider theme={Theme}>
            <div className={classes.root}>
              <NavBar onMenuClick={this.handleMenuClick} />
              <SideNavBar active={this.state.showSideNav} />
              <main className={classes.content}>
                <div className={classes.toolbar} />


                <Route exact path="/" render={() => <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>} />
                <Route exact path="/gallery" component={Gallery} />
                <Route exact path="/settings" component={AppSettings} />


              </main>
            </div>
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