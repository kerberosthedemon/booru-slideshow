import React, { useContext, useState } from 'react'
import { Dialog, DialogContent, makeStyles } from '@material-ui/core';
import FileRenderer from './file-renderer/FileRenderer';
import TagsRenderer from './tags-renderer/TagsRenderer';
import PictureController from './services/PictureController';
import { SelectedPostIndexContext } from 'context/PostContextProvider';
import { PostListContext } from '../../../context/PostContextProvider';
import usePictureController from './usePictureController';

const useStyles = makeStyles(() => ({
  noPadding: {
    paddingTop: '0 !important'
  }

}));

export default function FullModal({ open, onClose }) {
  const classes = useStyles();
  const [postList] = useContext(PostListContext);
  const [selectedPostIndex, setSelectedPostIndex] = useContext(SelectedPostIndexContext);

  const [transform, handlers] = usePictureController(onClose);
  const [editMode, setEditMode] = useState(false);

  const handleKeyUp = event => {
    switch (event.key) {
      case 'Escape':
      case 'c':
        handlers.handleKeyUp(event);
        setEditMode(false);
        break;

      case 'a':
      case 'd':
        if (editMode)
          handlers.handleKeyUp(event);
        else
          switchSelectedPicture(event);
        break;

      default:
        if (editMode)
          handlers.handleKeyUp(event);
        break;
    }
  }

  const handleKeyDown = event => {
    if (editMode) {
      handlers.handleKeyDown(event);
    }
    else {
      switch (event.key) {
        case 'q':
          setEditMode(true);
          handlers.handleKeyDown(event);
          break;

        case 'e':
          setEditMode(true);
          handlers.handleKeyDown(event);
          break;

        default:
          break;
      }
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
    <Dialog fullScreen scroll="paper" open={open} onClose={onClose} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <DialogContent className={classes.noPadding}>
        {selectedPostIndex !== null && <FileRenderer selectedPost={postList[selectedPostIndex]} transform={transform} />}
        {selectedPostIndex !== null && <TagsRenderer selectedPost={postList[selectedPostIndex]} />}
      </DialogContent>
    </Dialog>
  )
}
