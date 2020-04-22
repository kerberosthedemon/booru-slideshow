import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField, Chip } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'

const BACKSPACE_KEYCODE = 8;
const SPACE_KEYCODE = 32;

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
}));

export default function SearchInput() {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [inputText, setInputText] = useState('');
  const [textChanged, setTextChanged] = useState(false);

  const handleChange = event => {
    const text = event.target.value.trim();
    setInputText(text);

    setTextChanged(true);
  }

  const handleSubmit = event => {
    event.preventDefault();

    // Actualizo la lista de tags por si quedo algo escrito en la barra de busqueda
    event.keyCode = BACKSPACE_KEYCODE;
    handleNewTag(event);
    // --------------------------------------------------------------------------//

    //setSearchTags(tags);
  }

  const handleNewTag = event => {

    if (event.keyCode === SPACE_KEYCODE && inputText.trim() !== '') {
      const newTags = tags.slice();
      newTags.push(inputText.trim());
      setTags(newTags);
      setInputText('');
    }

    if (event.keyCode === BACKSPACE_KEYCODE && !inputText && !textChanged) {
      const newTags = tags.slice();
      newTags.pop();
      setTags(newTags);
      setInputText('');
    }

    setTextChanged(false);
  }

  return (
    <div className={classes.contanier}>
      {tags.map(tag => <Chip className={classes.chip} onDelete={() => { }} label={tag} />)}
      <form onSubmit={handleSubmit}>
        <TextField
          InputProps={{ classes, disableUnderline: true }}
          placeholder={tags.length ? '' : 'Search...'}
          onKeyUp={handleNewTag}
          value={inputText}
          onChange={handleChange} />
      </form>
    </div>
  );
}