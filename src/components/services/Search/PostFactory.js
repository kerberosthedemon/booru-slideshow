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
      this.getRatingFromJson(postJson, booruConfiguration) //rating
    );
  }

  getPostIdFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.idPropertyName];
  }

  getPreviewURLFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.previewURLPropertyName];
  }

  getSampleURLFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.sampleURLPropertyName];
  }

  getFileURLFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.fileURLPropertyName];
  }

  getFileWidthFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.fileWidthPropertyName];
  }

  getFileHeightFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.fileHeightPropertyName];
  }

  getTagsFromJson = (json, booruConfiguration) => {
    return json[booruConfiguration.tagsProperyName].split(' ').filter(el => el !== "");
  }

  getArtistsFromJson = (json, booruConfiguration) => {
    const artists = json[booruConfiguration.artistsPropertyName];
    return this.isXMLFormat ? [artists] : json[artists]
  }

  getRatingFromJson(json, booruConfiguration) {
    switch (json[booruConfiguration.ratingPropertyName]) {
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
}