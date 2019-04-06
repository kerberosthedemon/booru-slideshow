
import SearchService from './SearchService';

export default class E621SearchService extends SearchService {
  constructor() {
    super("https://e621.net/post/index.json?", 1, false)
  }
}