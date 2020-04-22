import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideMenu from './SideMenu';
import SearchInput from './SearchInput';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    background: theme.palette.gradient.primary
  }
}));

export default function Header() {
  const classes = useStyles();
  const [showSideMenu, setShowSideMenu] = useState(false);

  const toggleDrawer = () => {
    setShowSideMenu(!showSideMenu);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Booru-Slideshow
          </Typography>
          <SearchInput />
        </Toolbar>
      </AppBar>

      <SideMenu {...{ showSideMenu, toggleDrawer }} />
    </div>
  );
}