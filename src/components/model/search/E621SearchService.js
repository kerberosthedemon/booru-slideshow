
import SearchService from './SearchService';
export default class E621SearchService extends SearchService {
  constructor() {
    this.baseURL = 'https://e621.net/post/index.json?';
  }

  getNext(searchObject) {
    fetch(this.baseURL + this.getTagsQuery(searchObject.tags) + this.getPageQuery(searchObject.page) + this.getLimitQuery(searchObject.limit))
  }

  getTagsQuery(tags) {
    return "tags=" + tags.map((tag) => { return "+" + tag })
  }
}