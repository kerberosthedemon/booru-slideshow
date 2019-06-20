import React, { useContext } from 'react'
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import GalleryIcon from '@material-ui/icons/PhotoLibrary';
import { Link } from 'route-lite';
import Gallery from '../gallery/Gallery';
import AppSettings from './../app-settings/AppSettings';
import { UserContext } from './../App';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '14em';

const useStyles = makeStyles(theme => ({
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
}));

export default function SideNavBar() {

  const classes = useStyles();
  const { postList, handleViewButtonClick } = useContext(UserContext);

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: true ? classes.drawerPaperShow : classes.drawerPaperHidden }}
    >
      <div className={classes.toolbar} />
      <List>
        <Link component={{}} componentProps={{}} style={{ textDecoration: 'none', color: 'unset' }}>
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
        <Link component={Gallery} componentProps={{postList,handleViewButtonClick}} style={{ textDecoration: 'none', color: 'unset' }}>
          <ListItem button>
            <ListItemIcon>
              <GalleryIcon />
            </ListItemIcon>
            <ListItemText primary="My galleries" />
          </ListItem>
        </Link>

        <Link component={AppSettings} componentProps={{}} style={{ textDecoration: 'none', color: 'unset' }}>
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