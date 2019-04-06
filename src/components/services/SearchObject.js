export default class SearchObject {
  constructor(_tags) {
    this.tags = _tags ? _tags.split(" ") : "";
    this.page = 0;
    this.limit = 10;
  }
}