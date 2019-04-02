import Axios from "axios";



export default class SearchService {
  constructor() {
    this.axios = Axios
    this.axios.defaults.withCredentials = true;
  }

  search(searchText) {
    this.currentSearchObject = this.setupNewSearchObject(searchText);
    return this.getNext();
  }

  getBlobURL = (post) => {
    switch (post.fileType) {
      case "webm":
      case "mp4":
        return post.fullURL

      default:
        return post.sampleURL
    }
  }

  getFullBlobURL = async (post) => {
    return this.axios.get(this.getBlobURL(post), { responseType: 'blob' })
      .then((response) => response.data)
      .then((data) => data)
  }
}