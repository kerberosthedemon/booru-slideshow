import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BooruCheckList({ configurations, actions }) {
  const classes = useStyles();

  const handleToggle = (index) => () => {
    actions.toggleConfig(index)
  };

  return (
    <List className={classes.root}>
      {configurations.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(index)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value.isEnabled}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.configName}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
