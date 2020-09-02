import React, { useContext, useState } from 'react'
import { Dialog, makeStyles } from '@material-ui/core';
import FileRenderer from './file-renderer/FileRenderer';
import TagsRenderer from './tags-renderer/TagsRenderer';
import { SelectedPostIndexContext } from 'context/PostContextProvider';
import { PostListContext } from '../../../context/PostContextProvider';
import usePictureController from './usePictureController';

const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    'grid-template-rows': '100% 1fr',
    'grid-template-columns': '100%',
    'overflow-x': 'hidden',
    height: '100%'
  }

}));

export default function FullModal({ open, onClose }) {
  const classes = useStyles();
  const [postList] = useContext(PostListContext);
  const [selectedPostIndex, setSelectedPostIndex] = useContext(SelectedPostIndexContext);

  const [transform, handlers, picControllerActions] = usePictureController();
  const [editMode, setEditMode] = useState(false);

  const handleKeyUp = event => {
    switch (event.key) {
      case 'Escape':
        picControllerActions.resetTransform();
        setEditMode(false);
        onClose();
        break;

      case 'c':
        picControllerActions.resetTransform();
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
      <div className={classes.grid}>
        {selectedPostIndex !== null && <FileRenderer selectedPost={postList[selectedPostIndex]} transform={transform} />}
        {selectedPostIndex !== null && <TagsRenderer selectedPost={postList[selectedPostIndex]} />}
      </div>
    </Dialog>
  )
}
