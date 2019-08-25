import React, { createContext, useState } from 'react'
import Content from './Content';

export const PostListContext = createContext();
export const SelectedPostContext = createContext();
export const FullScreenModalContext = createContext();

export default function App() {
  const postList = useState([]);
  const selectedPost = useState({
    id: 1,
    index: 1,
    loadingPercentage: 30,
    fullBlobURL: 'https://i.imgur.com/fdOtFO1.png',
    fileType: 'png'
  });
  const showFullscreenModal = useState(true);

  return (
    <PostListContext.Provider value={postList}>
      <SelectedPostContext.Provider value={selectedPost}>
        <FullScreenModalContext.Provider value={showFullscreenModal}>
          <Content />
        </FullScreenModalContext.Provider>
      </SelectedPostContext.Provider>
    </PostListContext.Provider>
  )
}
