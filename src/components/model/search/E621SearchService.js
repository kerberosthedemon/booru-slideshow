
import SearchService from './SearchService';
import Post from '../Post';
import SearchObject from './SearchObject';
export default class E621SearchService extends SearchService {
  constructor() {
    super()
    this.baseURL = 'https://e621.net/post/index.json?';
    this.searchLimit = 50;
  }

  setupNewSearchObject(searchText) {
    let searchObject = new SearchObject(searchText);
    searchObject.limit = this.searchLimit;
    return searchObject;
  }

  getNext() {
    return fetch(this.baseURL + this.getTagsQuery(this.currentSearchObject.tags) + this.getPageQuery(this.currentSearchObject.page) + this.getLimitQuery(this.searchLimit))
      .then((response) => response.json())
      .then((data) => {
        this.currentSearchObject.page++;
        return data.map((element) => { return this.convertToPost(element) });
      });
  }

  getTagsQuery(tags) {
    let query = "tags="
    tags.forEach((tag) => { query = query.concat("+" + tag) });
    return query;
  }

  getPageQuery(page) {
    return "&page=" + page;
  }

  getLimitQuery(limit) {
    return "&limit=" + limit;
  }

  convertToPost(postJson) {
    return new Post(postJson.id, postJson.preview_url, postJson.file_url, new Blob(), new Blob());
  }
}