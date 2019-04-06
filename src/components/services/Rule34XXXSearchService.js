import SearchService from './SearchService';

export default class Rule34XXXSearchService extends SearchService {
  constructor() {
    super('https://rule34.xxx/index.php?page=dapi&s=post&q=index')
  }
}