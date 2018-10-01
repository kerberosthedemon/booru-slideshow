import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import GalleryIcon from '@material-ui/icons/PhotoLibrary';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const drawerWidth = '14em';

const styles = theme => ({
  drawerPaperHidden: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('margin-left'),
    marginLeft: 'calc( -' + drawerWidth + ' - 2px)',
  },
  drawerPaperShow: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('margin-left'),
    marginLeft: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class SideNavBar extends Component {
  render() {
    const { classes } = this.props;

    console.log(this.props.active ? classes.drawerPaperShow : classes.drawerPaperHidden);

    return (
      <Drawer
        variant="permanent"
        classes={{ paper: this.props.active ? classes.drawerPaperShow : classes.drawerPaperHidden }}
      >
        <div className={classes.toolbar} />
        <List>
          <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <List>
          <Link to="/gallery" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItem button>
              <ListItemIcon>
                <GalleryIcon />
              </ListItemIcon>
              <ListItemText primary="My galleries" />
            </ListItem>
          </Link>

          <Link to="/settings" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    )
  }
}

SideNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNavBar);