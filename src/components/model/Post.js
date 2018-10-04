export default class Post {
  constructor(id, thumbURL, fullURL, thumbBlob, fullBlob, width, height) {
    this.id = id;
    this.thumbURL = thumbURL;
    this.fullURL = fullURL;
    this.thumbBlob = thumbBlob;
    this.fullBlob = fullBlob;
    this.width = width;
    this.height = height;
  }

  isVerticalLayout = () => {
    return this.width <= this.height;
  }
}