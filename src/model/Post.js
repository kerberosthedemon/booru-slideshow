export default class Post {
  constructor(id, thumbURL, sampleURL, fullURL, width, height, tags, artists, rating) {
    this.id = id;
    this.thumbURL = thumbURL;
    this.sampleURL = sampleURL;
    this.fullURL = fullURL;
    this.thumbBlob = null;
    this.fullBlobURL = null;
    this.width = width;
    this.height = height;
    this.tags = tags;
    this.artists = artists;
    this.rating = rating; //Ratings: Safe - Questionable - Explicit
    this.fileType = this.getFileType();
    this.loadingPercentage = 0;
  }

  getFileType = () => {
    return this.fullURL.substr(this.fullURL.lastIndexOf(".") + 1)
  }

  isVerticalLayout = () => {
    return this.width <= this.height;
  }
}

