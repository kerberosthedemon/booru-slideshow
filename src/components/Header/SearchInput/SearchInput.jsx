import React, { useState, useContext, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TextField, Chip, IconButton } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'
import DeleteIcon from '@material-ui/icons/Delete';
import { PostListContext } from '../../../context/PostContextProvider';
import { useConfiguration } from '../../../hooks/useConfiguration';
import useFocusElementOnStart from '../../../hooks/useFocusOnStart';
import PostSearchMockService from '../../../services/Search/mock/PostSearchMockService';
import { SearchQueryContext } from 'components/App';

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
  settingsIcon: {
    padding: '0px',
    margin: 'auto'
  }
}));

export default function SearchInput() {

  const searchService = new PostSearchMockService();
  const [configurations, configActions] = useConfiguration();

  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [textChanged, setTextChanged] = useState(false);
  const [tags, actions] = useContext(SearchQueryContext);
  const [, setPostList] = useContext(PostListContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRef = useFocusElementOnStart();

  const handleChange = event => {
    const text = event.target.value;
    setInputText(text);
  }

  useEffect(() => {
    const search = async (booruConfiguration) => {
      var posts = await searchService.search({ tags, page: 0 }, booruConfiguration);
      setPostList(prevState => prevState.concat(posts));
    }

    if (isSubmit) {
      configurations.forEach((config) => {
        if (config.isEnabled) {
          search(config);
        }
      });
    }
  }, [tags]);


  const handleKeyUp = event => {

    switch (event.keyCode) {
      case SPACE_KEYCODE:
        actions.addTagsFromString(inputText);
        setInputText('');
        break;

      case ENTER_KEYCODE:
        actions.addTagsFromString(inputText);
        setIsSubmit(true)
        setInputText('')
        break;

      case BACKSPACE_KEYCODE:
        if (inputText === '') {
          actions.removeLastTag();
          setInputText('');
        }
        break;

      default:
        break;
    }

    setTextChanged(false);
  }

  return (
    <div className={classes.contanier}>
      {tags.map((tag, index) => <Chip key={`chip_${index}`} className={classes.chip} onDelete={() => { actions.removeTagAtIndex(index) }} label={tag} />)}
      <TextField
        inputRef={inputRef}
        InputProps={{ classes: { input: classes.input }, disableUnderline: true }}
        placeholder={tags.length ? '' : 'Search...'}
        onKeyUp={handleKeyUp}
        value={inputText}
        onChange={handleChange} />
      <IconButton aria-label="delete" className={classes.settingsIcon}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}