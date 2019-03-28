export default class Post {
  constructor(id, thumbURL, fullURL, width, height, tags, artists, rating) {
    this.id = id;
    this.thumbURL = thumbURL;
    this.fullURL = fullURL;
    this.thumbBlob = null;
    this.fullBlobURL = null;
    this.width = width;
    this.height = height;
    this.tags = tags;
    this.artists = artists;
    this.rating = rating; //Ratings: Safe - Questionable - Explicit
  }

  isVerticalLayout = () => {
    return this.width <= this.height;
  }
}

