import SearchService from './SearchService';

export default class SafebooruSearchService extends SearchService {
  constructor() {
    super('https://safebooru.org/index.php?page=dapi&s=post&q=index')
  }

  getPreviewURLFromJson(json) {
    return 'https:' + json.preview_url;
  }

  getSampleURLFromJson(json) {
    return 'https:' + json.sample_url;
  }

  getFullURLFromJson(json) {
    return 'https:' + json.file_url;
  }
}