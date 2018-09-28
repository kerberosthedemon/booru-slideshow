import React, { Component } from 'react'
import { Theme } from './Theme';
import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavBar from './nav-bar/NavBar';
import SideDrawer from './side-drawer/SideDrawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
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


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <MuiThemeProvider theme={Theme}>
          <div className={classes.root}>
            <NavBar />
            <SideDrawer />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
            </main>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);