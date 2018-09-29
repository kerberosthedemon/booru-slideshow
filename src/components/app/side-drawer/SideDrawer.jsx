import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaperHidden: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('margin-left'),
    marginLeft: -drawerWidth - 1,
  },
  drawerPaperShow: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('margin-left'),
    marginLeft: 0,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['900'],
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  hover: {},
});

class SideDrawer extends Component {
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
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideDrawer);