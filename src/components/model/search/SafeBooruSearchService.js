import SearchService from './SearchService';
import Post from '../Post';
import SearchObject from './SearchObject';
import xmlToJson from 'xml-to-json-stream';

const xmlParser = xmlToJson({attributeMode: false});
export default class SafeBooruSearchService extends SearchService {
  constructor() {
    super()
    this.baseURL = 'https://safebooru.org/index.php?page=dapi&s=post&q=index';
    this.enableJSONQueryStringParameter = '&json=1';
    this.searchLimit = 10;
  }

  setupNewSearchObject(searchText) {
    let searchObject = new SearchObject(searchText);
    searchObject.limit = this.searchLimit;
    searchObject.page = 1;
    return searchObject;
  }

  getNext() {
    return fetch(this.getRequestString())
      .then((response) => {
        console.log(response)
        xmlParser.xmlToJson(response.body)
      })
      .then((data) => {
        this.incrementPage(1);
        return data.map((element) => { return this.convertToPost(element) });
      });
  }

  incrementPage = (amount) => {
    this.currentSearchObject.page += amount;
  }

  getRequestString() {
    return this.baseURL + this.getTagsQuery(this.currentSearchObject.tags) + this.getPageQuery(this.currentSearchObject.page) + this.getLimitQuery(this.searchLimit) + this.enableJSONQueryStringParameter;
  }

  getTagsQuery(tags) {
    let query = "&tags=rating:safe+mecha"
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
    return new Post(postJson.id, this.getPreviewURLFromJson(postJson), this.getFileURLFromJson(postJson), postJson.width, postJson.height, this.getTagsFromJson(postJson), this.getArtistsFromJson(postJson), this.getRatingFromJson(postJson));
  }

  getPreviewURLFromJson(json) {
    return "";
  }

  getFileURLFromJson(json) {
    return 'https://safebooru.org/images/' + json.directory + '/' + json.image;
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