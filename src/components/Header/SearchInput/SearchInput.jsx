import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField, Chip, IconButton } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'
import DeleteIcon from '@material-ui/icons/Delete';
import useFocusElementOnStart from '../../../hooks/useFocusOnStart';
import useSearchInput from './useSearchInput';

const borderColorFocused = '#d97f53';
const backgroundColor = 'rgba(1,0,0,.3)';

const useStyles = makeStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  contanier: {
    overflow: 'hidden',
    display: 'flex',
    cursor: 'text',
    borderRadius: 4,
    backgroundColor: backgroundColor,
    border: `1px solid ${grey[500]}`,
    '&:focus, &:active, &:hover': {
      boxShadow: `${fade(borderColorFocused, 0.5)} 0 0 0 0.2rem`,
      borderColor: borderColorFocused,
    },
    transition: theme.transitions.create(['border-color', 'box-shadow']),

  },
  chip: {
    margin: 'auto',
    marginLeft: '2px',
  },
  input: {
    position: 'relative',
    fontSize: 15,
    width: 'auto',
    padding: '10px 12px',
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
  },
  settingsIcon: {
    padding: '0px',
    margin: 'auto'
  }
}));

export default function SearchInput() {

  const classes = useStyles();
  const [tags, tagActions, inputText, inputActions] = useSearchInput();
  const inputRef = useFocusElementOnStart();

  return (
    <div className={classes.contanier}>
      {tags.map((tag, index) => <Chip key={`chip_${index}`} className={classes.chip} onDelete={() => { tagActions.removeTagAtIndex(index) }} label={tag} />)}
      <TextField
        inputRef={inputRef}
        InputProps={{ classes: { input: classes.input }, disableUnderline: true }}
        placeholder={tags.length ? '' : 'Search...'}
        onKeyUp={inputActions.handleKeyUp}
        value={inputText}
        onChange={inputActions.handleChange} />
      <IconButton aria-label="delete" className={classes.settingsIcon}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}