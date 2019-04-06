import SearchService from './SearchService';

export default class DanbooruSearchService extends SearchService {
    constructor() {
        super('https://danbooru.donmai.us/posts.json?', 1, false);
    }

    getPreviewURLFromJson = (json) => {
        return json.preview_file_url
    }

    getSampleURLFromJson = (json) => {
        return json.large_file_url
    }

    getFileURLFromJson = (json) => {
        return json.file_url
    }

    getFileWidthFromJson = (json) => {
        return json.image_width
    }

    getFileHeightFromJson = (json) => {
        return json.image_height
    }

    getTagsFromJson = (json) => {
        return json.tag_string.split(' ').filter(el => el !== "");
    }

    getArtistsFromJson = (json) => {
        return [json.tag_string_artist];
    }
}
