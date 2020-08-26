
import { PostFactory } from './../PostFactory';
import thumbURL from './mockThumb.png';
import fullURL from './mockPicture.jpg';

export default class PostMockFactory extends PostFactory {
  getPreviewURLFromJson = (json, booruConfiguration) => {
    return thumbURL;
  }

  getFileURLFromJson = (json, booruConfiguration) => {
    return fullURL;
  }

  getSampleURLFromJson = (json, booruConfiguration) => {
    return this.getFileURLFromJson(json, booruConfiguration);
  }
}