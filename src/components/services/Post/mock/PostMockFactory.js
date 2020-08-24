
import { PostFactory } from './../PostFactory';
import thumbURL from 'components/services/Post/mock/mockThumb.png';
import fullURL from 'components/services/Post/mock/mockPicture.jpg';

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