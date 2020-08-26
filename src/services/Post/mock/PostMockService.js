
import PostService from './../PostService';

export default class PostMockService extends PostService {
  async getBlob(post, progress, error) {
    let response = await super.getBlob(post, progress, error);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return response;
  }
}