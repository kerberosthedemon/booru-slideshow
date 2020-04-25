import React, { createContext, useState } from 'react'
import Content from './Content';

export const PostListContext = createContext();
export const SelectedPostContext = createContext();
export const FullScreenModalContext = createContext();
export const SearchQueryContext = createContext();

export default function App() {
  const postList = useState([
    { thumbURL: 'https://safebooru.org//samples/2943/sample_5549af6f7d7793732ff18316029a51e701842ab2.jpg?3064620' },
    { thumbURL: 'https://safebooru.org//samples/2943/sample_5549af6f7d7793732ff18316029a51e701842ab2.jpg?3064620' },
    { thumbURL: 'https://safebooru.org//samples/2943/sample_5549af6f7d7793732ff18316029a51e701842ab2.jpg?3064620' },
    { thumbURL: 'https://safebooru.org//samples/2943/sample_5549af6f7d7793732ff18316029a51e701842ab2.jpg?3064620' },
  ]);
  const selectedPost = useState({
    id: 1,
    index: 1,
    loadingPercentage: 30,
    fullBlobURL: 'https://i.imgur.com/fdOtFO1.png',
    fileType: 'png'
  });
  const showFullscreenModal = useState(false);
  const searchQuery = useState({
    tags: [],
    page: 0
  });

  return (
    <SearchQueryContext.Provider value={searchQuery}>
      <PostListContext.Provider value={postList}>
        <SelectedPostContext.Provider value={selectedPost}>
          <FullScreenModalContext.Provider value={showFullscreenModal}>
            <Content />
          </FullScreenModalContext.Provider>
        </SelectedPostContext.Provider>
      </PostListContext.Provider>
    </SearchQueryContext.Provider>
  )
}
