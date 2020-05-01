import Post from './../../model/Post';

export class PostFactory {
  generateNewPost = (postJson, booruConfiguration) => {
    return new Post(
      this.getPostIdFromJson(postJson, booruConfiguration), // id
      this.getPreviewURLFromJson(postJson, booruConfiguration), // preview_url
      this.getSampleURLFromJson(postJson, booruConfiguration), // sample_url
      this.getFileURLFromJson(postJson, booruConfiguration), // file_url
      this.getFileWidthFromJson(postJson, booruConfiguration), // width
      this.getFileHeightFromJson(postJson, booruConfiguration), // height
      this.getTagsFromJson(postJson, booruConfiguration), //tags
      this.getArtistsFromJson(postJson, booruConfiguration), // artist
      this.getRatingFromJson(postJson, booruConfiguration), //rating
      this.getCharactersFromJson(postJson, booruConfiguration),
      this.getSpeciesTagFromJson(postJson, booruConfiguration),
      this.getCopyrightTagFromJson(postJson, booruConfiguration)
    );
  }

  getPostIdFromJson = (json, booruConfiguration) => {
    return this.resolve(booruConfiguration.idPropertyName, json);
  }

  getPreviewURLFromJson = (json, booruConfiguration) => {
    return this.resolve(booruConfiguration.previewURLPropertyName, json);
  }

  getSampleURLFromJson = (json, booruConfiguration) => {
    return this.resolve(booruConfiguration.sampleURLPropertyName, json);
  }

  getFileURLFromJson = (json, booruConfiguration) => {
    return this.resolve(booruConfiguration.fileURLPropertyName, json);
  }

  getFileWidthFromJson = (json, booruConfiguration) => {
    return this.resolve(booruConfiguration.fileWidthPropertyName, json);
  }

  getFileHeightFromJson = (json, booruConfiguration) => {
    return this.resolve(booruConfiguration.fileHeightPropertyName, json);
  }

  getTagsFromJson = (json, booruConfiguration) => {
    const tags = this.resolve(booruConfiguration.tagsProperyName, json);
    return booruConfiguration.shouldFormatTags ? tags.split(' ').filter(el => el !== "") : tags;
  }

  getArtistsFromJson = (json, booruConfiguration) => {
    let artists = this.resolve(booruConfiguration.artistsPropertyName, json);
    if (!artists) artists = [];
    return this.isXMLFormat ? [artists] : artists
  }

  getRatingFromJson = (json, booruConfiguration) => {
    switch (this.resolve(booruConfiguration.ratingPropertyName, json)) {
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

  getCharactersFromJson = (json, booruConfiguration) => {
    if (booruConfiguration.charactersPropertyName)
      return this.resolve(booruConfiguration.charactersPropertyName, json);
    else
      return [];
  }

  getSpeciesTagFromJson = (json, booruConfiguration) => {
    if (booruConfiguration.speciesTagPropertyName)
      return this.resolve(booruConfiguration.speciesTagPropertyName, json)
    else
      return [];
  }

  getCopyrightTagFromJson = (json, booruConfiguration) => {
    if (booruConfiguration.copyrightTagPropertyName)
      return this.resolve(booruConfiguration.copyrightTagPropertyName, json)
    else
      return [];
  }

  resolve = (path, obj, separator = '.') => {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
  }
}