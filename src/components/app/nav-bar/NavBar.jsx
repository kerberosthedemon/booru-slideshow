import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import SafebooruSearchService from './../../model/search/SafebooruSearchService';
import E621SearchService from './../../model/search/E621SearchService';
import GelbooruSearchService from "./../../model/search/GelbooruSearchService";
import DanbooruSearchService from './../../model/search/DanbooruSearchService';
import Rule34XXXSearchService from './../../model/search/Rule34XXXSearchService';

const services = [
  {
    name: "Danbooru",
    service: new DanbooruSearchService(),
  },
  {
    name: "E621",
    service: new E621SearchService(),
  },
  {
    name: "Gelbooru",
    service: new GelbooruSearchService(),
  },
  {
    name: "Rule 34",
    service: new Rule34XXXSearchService(),
  },
  {
    name: "Safebooru",
    service: new SafebooruSearchService(),
  }
]

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(45deg, #f6356f 0%,#ff5f50 100%)',
    boxShadow: theme.shadows[2],
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class NavBar extends Component {

  state = { searchText: '' };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.searchText);
  }

  handleChange = (service) => () => {
    this.props.onToggleService(service)
  }

  render() {
    const { classes, selectedServices } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.props.onMenuClick}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              Booru-Slideshow
            </Typography>
            <div className={classes.grow} />
            <Select
            multiple
            value={[]}
            //onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            //MenuProps={MenuProps}
          >
            {services.map(service => (
              <MenuItem key={"servicio_" + service.name} onChange={this.handleChange(service)}>
                <Checkbox checked={selectedServices.some(selectedService => selectedService.name === service.name)} disableRipple />
                <ListItemText primary={service.name} />                                
              </MenuItem>
            ))}
          </Select>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit}>
                <Input
                  placeholder="Search…"
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(event) => this.setState({ searchText: event.target.value })}
                />
              </form>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
