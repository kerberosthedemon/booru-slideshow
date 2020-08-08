import React, { useState, useContext, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField, Chip } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'
import { SearchQueryContext, PostListContext } from './App';
import { BooruConfigurationLoader } from '../services/BooruConfiguration/BooruConfigurationLoader';
import { PostSearchService } from '../services/Search/PostSearchService';

const BACKSPACE_KEYCODE = 8;
const SPACE_KEYCODE = 32;
const ENTER_KEYCODE = 13;

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
  const [, setPostList] = useContext(PostListContext);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = event => {
    const text = event.target.value;
    if (text.trim() !== '') {
      setInputText(text);
      setTextChanged(true);
    }
  }

  useEffect(() => {
    if (isSubmit) {
      booruConfigurations.forEach((booruConfiguration) => {
        if (booruConfiguration.isEnabled) {
          search(booruConfiguration);
        }
      });
    }
    return () => {
      setIsSubmit(false);
    }
  }, [searchQuery]);

  const search = async (booruConfiguration) => {
    var posts = await searchService.search(searchQuery, booruConfiguration);
    setPostList(prevState => prevState.concat(posts));
  }

  const handleKeyUp = event => {

    if (event.keyCode === SPACE_KEYCODE && inputText.trim() !== '') {
      setTags();
    }

    if (event.keyCode === BACKSPACE_KEYCODE && !inputText && !textChanged) {
      let newTags = searchQuery.tags;
      newTags.pop();
      setSearchQuery(prevState => ({ ...prevState, tags: newTags }));
      setInputText('');
    }

    if (event.keyCode === ENTER_KEYCODE) {
      setIsSubmit(true);

      if (inputText.trim() !== '') {
        setTags();
      }
      else {
        setSearchQuery(prevState => ({ ...prevState }));;
      }
    }

    setTextChanged(false);
  }

  const getTagsFromString = text => {
    let tags = text.split(' ');
    return tags.filter(t => t !== '');
  }

  const setTags = () => {
    setSearchQuery(prevState => ({
      ...searchQuery,
      tags: prevState.tags.concat(getTagsFromString(inputText))
    }));
    setInputText('');
  }

  const removeTagAtIndex = (index) => {
    setSearchQuery(prevState => ({ ...prevState, tags: prevState.tags.filter((_, tagIndex) => tagIndex !== index) }));
  }

  return (
    <div className={classes.contanier}>
      {searchQuery.tags.map((tag, index) => <Chip key={`chip_${index}`} className={classes.chip} onDelete={() => { removeTagAtIndex(index) }} label={tag} />)}
      <TextField
        InputProps={{ classes: { input: classes.input }, disableUnderline: true }}
        placeholder={searchQuery.tags.length ? '' : 'Search...'}
        onKeyUp={handleKeyUp}
        value={inputText}
        onChange={handleChange} />
    </div>
  );
}