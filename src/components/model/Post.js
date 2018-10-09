export default class Post {
  constructor(id, thumbURL, fullURL, thumbBlob, fullBlob, width, height, tags, artists, rating) {
    this.id = id;
    this.thumbURL = thumbURL;
    this.fullURL = fullURL;
    this.thumbBlob = thumbBlob;
    this.fullBlob = fullBlob;
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

