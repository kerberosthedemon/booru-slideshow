import SearchObject from './../search/SearchObject';

export default class BooruService {
  constructor(_searchService) {
    this.SearchService = _searchService;
    this.currentSearchObject = null;
  }

  search(searchText) {
    this.currentSearchObject = new SearchObject(searchText);
    return this.getNext();
  }

  getNext() {
    return this.SearchService.getNext(this.currentSearchObject);
  }
}