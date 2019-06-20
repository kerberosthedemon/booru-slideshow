import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  TextField,
  FormControl,
  InputLabel
} from "@material-ui/core";
import DanbooruSearchService from "./../../services/DanbooruSearchService";
import E621SearchService from "./../../services/E621SearchService";
import GelbooruSearchService from "./../../services/GelbooruSearchService";
import Rule34XXXSearchService from "./../../services/Rule34XXXSearchService";
import SafebooruSearchService from "./../../services/SafebooruSearchService";
import ATFbooruSearchService from "./../../services/ATFbooruSearchService";
import { goTo } from 'route-lite';
import Gallery from "../gallery/Gallery";

const services = [
  {
    name: "Danbooru",
    service: new DanbooruSearchService()
  },
  {
    name: "E621",
    service: new E621SearchService()
  },
  {
    name: "Gelbooru",
    service: new GelbooruSearchService()
  },
  {
    name: "Rule 34",
    service: new Rule34XXXSearchService()
  },
  {
    name: "Safebooru",
    service: new SafebooruSearchService()
  },
  {
    name: "ATFbooru",
    service: new ATFbooruSearchService()
  }
];

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(45deg, #f6356f 0%,#ff5f50 100%)",
    boxShadow: theme.shadows[2]
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  arrowDropDown: {},
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  formControl: {
    minWidth: "17em",
    marginRight: ".7em"
  }
});

class NavBar extends Component {
  state = { searchText: "" };

  handleSubmit = event => {
    event.preventDefault();
    goTo(Gallery);
    this.props.onSearchSubmit(this.state.searchText);
  };

  handleChange = event => {
    this.props.onToggleService(event.target.value);
  };

  render() {
    const { classes, selectedServices } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.onMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
              noWrap
            >
              Booru-Slideshow
            </Typography>
            <div className={classes.grow} />
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.inputLabel} shrink>
                Selected services
              </InputLabel>
              <Select
                multiple
                value={selectedServices}
                onChange={this.handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={"chip_" + value.name}
                        label={value.name}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              //MenuProps={MenuProps}
              >
                {services.map(service => (
                  <MenuItem key={"servicio_" + service.name} value={service}>
                    <Checkbox
                      checked={selectedServices.indexOf(service) > -1}
                      disableRipple
                    />
                    <ListItemText primary={service.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Page" InputLabelProps={{ shrink: true }} />

            <div className={classes.search}>
              <form onSubmit={this.handleSubmit}>
                <Input
                  startAdornment={<SearchIcon className={classes.searchIcon} />}
                  endAdornment={
                    <IconButton disableRipple>
                      <ArrowDropDown className={classes.arrowDropDown} />
                    </IconButton>
                  }
                  placeholder="Search…"
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={event =>
                    this.setState({ searchText: event.target.value })
                  }
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
