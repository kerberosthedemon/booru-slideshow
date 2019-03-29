
export default class SearchService {
  search(searchText) {
    this.currentSearchObject = this.setupNewSearchObject(searchText);
    return this.getNext();
  }

  getFullBlobURL = async (post) => {
    return fetch(post.fullURL)
      .then((response) => response.blob())
      .then((data) => data)
  }
}