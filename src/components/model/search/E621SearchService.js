import SearchService from './SearchService';
import Post from '../Post';
import SearchObject from './SearchObject';
export default class E621SearchService extends SearchService {
  constructor() {
    super()
    this.baseURL = 'post/index.json?';
    this.searchLimit = 75;
  }

  setupNewSearchObject(searchText) {
    let searchObject = new SearchObject(searchText);
    searchObject.limit = this.searchLimit;
    searchObject.page = 1;
    return searchObject;
  }

  getNext() {
    return fetch(this.getRequestString())
      .then((response) => response.json())
      .then((data) => {
        this.incrementPage(1);
        return data.map((element) => { return this.convertToPost(element) });
      });
  }

  incrementPage = (amount) => {
    this.currentSearchObject.page += amount;
  }

  getRequestString() {
    return this.baseURL + this.getTagsQuery(this.currentSearchObject.tags) + this.getPageQuery(this.currentSearchObject.page) + this.getLimitQuery(this.searchLimit);
  }

  getTagsQuery(tags) {
    let query = "tags="
    if (tags)
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
    return new Post(postJson.id, postJson.preview_url, postJson.file_url, new Blob(), new Blob(), postJson.width, postJson.height, this.getTagsFromJson(postJson), this.getArtistsFromJson(postJson), this.getRatingFromJson(postJson));
  }

  getTagsFromJson(json) {
    return json.tags.split(' ');
  }

  getArtistsFromJson(json) {
    return json.artist;
  }

  getRatingFromJson(json) {
    switch (json.rating) {
      case "s":
        return "safe";
      case "q":
        return "questionable";
      case "e":
        return "explicit";
      default:
        return "safe";
    }
  }
}