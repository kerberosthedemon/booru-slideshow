import SearchService from './SearchService';

export default class GelbooruSearchService extends SearchService {
    constructor() {
        super('https://gelbooru.com/index.php?page=dapi&s=post&q=index');
    }
}
