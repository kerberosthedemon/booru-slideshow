import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField, Chip } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'

const borderColorFocused = '#d97f53';
const backgroundColor = 'rgba(1,0,0,.3)';

const useStyles = makeStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: backgroundColor,
    border: `1px solid ${grey[500]}`,
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus, &:active, &:hover': {
      boxShadow: `${fade(borderColorFocused, 0.5)} 0 0 0 0.2rem`,
      borderColor: borderColorFocused,
    },
  },
}));

export default function SearchInput() {
  const classes = useStyles();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} placeholder="Search..." />
  );
}