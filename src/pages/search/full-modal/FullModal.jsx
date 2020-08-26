import React, { useContext, useState } from 'react'
import { Dialog, DialogContent, makeStyles } from '@material-ui/core';
import FileRenderer from './file-renderer/FileRenderer';
import TagsRenderer from './tags-renderer/TagsRenderer';
import PictureController from './services/PictureController';
import { SelectedPostIndexContext } from 'context/PostContextProvider';
import { PostListContext } from '../../../context/PostContextProvider';

const useStyles = makeStyles(() => ({
  noPadding: {
    paddingTop: '0 !important'
  }
}));

export default function FullModal({ open, onClose }) {
  const [postList] = useContext(PostListContext);
  const [selectedPostIndex, setSelectedPostIndex] = useContext(SelectedPostIndexContext);
  const [editMode, setEditMode] = useState(false);
  const [style, setStyle] = useState();
  const controller = new PictureController(onClose);
  const classes = useStyles();

  const handleInputUp = input => {
    input.isKeyUp = true;
    handleInput(input);
  }

  const handleInput = input => {
    handleEditMode(input);

    if (editMode) {
      controller.handleInput(input, setStyle);
    }
    else {
      if (input.type === "keyup")
        switchSelectedPicture(input);
    }
  }

  const handleEditMode = input => {
    if (!editMode && (input.key === 'q' || input.key === 'e')) {
      setEditMode(true);
    }
    else if (editMode && input.key === 'c') {
      setEditMode(false);
    }
  }

  const switchSelectedPicture = input => {
    switch (input.key) {
      case 'a':
      case 'ArrowLeft':
        if (postList[selectedPostIndex - 1])
          setSelectedPostIndex(selectedPostIndex - 1);
        break;

      case 'd':
      case 'ArrowRight':
        if (postList[selectedPostIndex + 1])
          setSelectedPostIndex(selectedPostIndex + 1);
        break;
      default:
        break;
    }
  }

  return (
    <Dialog fullScreen scroll="paper" open={open} onClose={onClose}>
      <DialogContent className={classes.noPadding}>
        {selectedPostIndex !== null && <FileRenderer selectedPost={postList[selectedPostIndex]} customStyle={style} />}
        {selectedPostIndex !== null && <TagsRenderer selectedPost={postList[selectedPostIndex]} />}
      </DialogContent>
    </Dialog>
  )
}
