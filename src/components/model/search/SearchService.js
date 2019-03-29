import Axios from "axios";



export default class SearchService {
  constructor(){
    this.axios = Axios
    this.axios.defaults.withCredentials = true;
  }

  search(searchText) {
    this.currentSearchObject = this.setupNewSearchObject(searchText);
    return this.getNext();
  }

  getFullBlobURL = async (post) => {
    return this.axios.get(post.fullURL, {responseType: 'blob'})
      .then((response) => response.data)
      .then((data) => data)
  }
}