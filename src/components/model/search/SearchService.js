
export default class SearchService {
  search(searchText) {
    this.currentSearchObject = this.setupNewSearchObject(searchText);
    return this.getNext();
  }
}