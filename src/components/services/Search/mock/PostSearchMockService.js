
import { PostSearchService } from './../PostSearchService';
import * as mockPosts from './mockData.json';
import PostMockFactory from './../../Post/mock/PostMockFactory';

export default class PostSearchMockService extends PostSearchService {

  postFactory = new PostMockFactory();

  getPosts(searchQuery, booruConfiguration) {
    return Promise.resolve({ data: mockPosts.default });
  }


}