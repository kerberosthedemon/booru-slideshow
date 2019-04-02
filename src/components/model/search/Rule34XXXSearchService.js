import SearchService from './SearchService';
import Post from '../Post';
import SearchObject from './SearchObject';
import xmlJs from 'xml-js';

export default class Rule34XXXSearchService extends SearchService {
  constructor() {
    super()
    this.baseURL = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index';
    this.searchLimit = 50;
  }

  setupNewSearchObject(searchText) {
    let searchObject = new SearchObject(searchText);
    searchObject.limit = this.searchLimit;
    searchObject.page = 1;
    return searchObject;
  }

  getNext() {
    return this.axios.get(this.getRequestString(), {})
      .then((response) => response.data)
      .then(xmlText => xmlJs.xml2js(xmlText, { compact: true, nativeType: true, nativeTypeAttributes: true }))
      .then((data) => {
        this.incrementPage(1);
        const { post } = data.posts
        return post.map((element) => { return this.convertToPost(element._attributes) });
      });
  }

  incrementPage = (amount) => {
    this.currentSearchObject.page += amount;
  }

  getRequestString() {
    return this.baseURL + this.getTagsQuery(this.currentSearchObject.tags) + this.getPageQuery(this.currentSearchObject.page) + this.getLimitQuery(this.searchLimit);
  }

  getTagsQuery(tags) {
    let query = "&tags="
    if (tags)
      tags.forEach((tag) => { query = query.concat("+" + tag) });
    return query;
  }

  getPageQuery(page) {
    return "&pid=" + page;
  }

  getLimitQuery(limit) {
    return "&limit=" + limit;
  }

  convertToPost(postJson) {
    return new Post(postJson.id, postJson.preview_url, postJson.sample_url, postJson.file_url, postJson.width, postJson.height, this.getTagsFromJson(postJson), this.getArtistsFromJson(postJson), this.getRatingFromJson(postJson));
  }

  getTagsFromJson(json) {
    return json.tags.split(' ');
  }

  getArtistsFromJson(json) {
    return null;
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