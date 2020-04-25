import React, { useState, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField, Chip } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'
import { SearchQueryContext, PostListContext } from '../components/App'
import { PostSearchService } from './services/Search/PostSearchService';
import { BooruConfigurationLoader } from './services/BooruConfiguration/BooruConfigurationLoader';

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

  const searchService = new PostSearchService();
  const booruConfigurations = BooruConfigurationLoader.loadConfigurations();

  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [textChanged, setTextChanged] = useState(false);
  const [searchQuery, setSearchQuery] = useContext(SearchQueryContext);
  const [postList, setPostList] = useContext(PostListContext);

  const handleChange = event => {
    const text = event.target.value.trim();
    setInputText(text);

    setTextChanged(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aqui actualizo la lista de tags por si quedo algo escrito en la barra de busqueda
    event.keyCode = SPACE_KEYCODE;
    handleNewTag(event);

    booruConfigurations.forEach((booruConfiguration) => {
      if (booruConfiguration.isEnabled) {
        search(booruConfiguration);
      }
    });
  }

  const search = async (booruConfiguration) => {
    var posts = await searchService.search(searchQuery, booruConfiguration);
    setPostList(postList.concat(posts));
  }

  const handleNewTag = event => {

    if (event.keyCode === SPACE_KEYCODE && inputText.trim() !== '') {
      const newTags = searchQuery.tags.slice();
      newTags.push(inputText.trim());
      setSearchQuery({ ...searchQuery, tags: newTags });
      setInputText('');
    }

    if (event.keyCode === BACKSPACE_KEYCODE && !inputText && !textChanged) {
      const newTags = searchQuery.tags.slice();
      newTags.pop();
      setSearchQuery({ ...searchQuery, tags: newTags });
      setInputText('');
    }

    setTextChanged(false);
  }

  return (
    <div className={classes.contanier}>
      {searchQuery.tags.map(tag => <Chip className={classes.chip} onDelete={() => { }} label={tag} />)}
      <form onSubmit={handleSubmit}>
        <TextField
          InputProps={{ classes, disableUnderline: true }}
          placeholder={searchQuery.tags.length ? '' : 'Search...'}
          onKeyUp={handleNewTag}
          value={inputText}
          onChange={handleChange} />
      </form>
    </div>
  );
}