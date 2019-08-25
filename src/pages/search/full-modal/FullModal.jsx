import React, { useContext, useState } from 'react'
import { Dialog, DialogContent } from '@material-ui/core';
import FileRenderer from './file-renderer/FileRenderer';
import { SelectedPostContext } from '../../../components/App';
import TagsRenderer from './tags-renderer/TagsRenderer';
import PictureController from './services/PictureController';
import { PostListContext } from './../../../components/App';

export default function FullModal({ open, onClose, ...rest }) {
  const [postList] = useContext(PostListContext);
  const [selectedPost, setSelectedPost] = useContext(SelectedPostContext);
  const [editMode, setEditMode] = useState(false);
  const [style, setStyle] = useState();
  const controller = new PictureController();

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
        setSelectedPost(postList[selectedPost.index - 1]);
        break;

      case 'd':
      case 'ArrowRight':
        setSelectedPost(postList[selectedPost.index + 1]);
        break;
      default:
        break;
    }
  }


  return (
    <Dialog fullScreen open={open} onClose={onClose} {...rest} onKeyDown={handleInput} onKeyUp={handleInputUp}>
      <DialogContent>
        {selectedPost && <FileRenderer selectedPost={selectedPost} customStyle={style} />}
        {selectedPost && <TagsRenderer selectedPost={selectedPost} />}
      </DialogContent>
    </Dialog>
  )
}
