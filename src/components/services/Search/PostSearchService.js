
import Axios from "axios";
import { PostFactory } from "./PostFactory";
import { ResponseFormatterService } from './ResponseFormatterService';
import { SearchQueryService } from "./SearchQueryService";

const axios = Axios

export class PostSearchService {

  postFactory = new PostFactory();
  formatterService = new ResponseFormatterService();
  searchQueryService = new SearchQueryService();

  search = async (searchQuery, booruConfiguration) => {
    return this.searchNextPage(searchQuery, booruConfiguration);
  }

  searchNextPage = async (searchQuery, booruConfiguration) => {
    let response = await axios.get(this.getURL(searchQuery, booruConfiguration), { withCredentials: true });
    const jsonResponse = this.formatterService.formatResponse(response, booruConfiguration);
    return new Promise((resolve, reject) => {
      resolve(jsonResponse.map(jsonPost => {
        try {
          return this.postFactory.generateNewPost(jsonPost, booruConfiguration);
        }
        catch (exception) {
          return alert(`Post ID: ${jsonPost.id} \n Exception: ${exception}`);
        }
      }).filter(element => element !== null))
    })
  }

  getURL = (searchQuery, booruConfiguration) => {
    return booruConfiguration.baseURL
      + this.searchQueryService.getQueryParameters(searchQuery, booruConfiguration);
  }

  static getFullBlobURL = async (post, onDownload) => {
    return axios.get(this.getBlobURL(post), {
      responseType: 'blob',
      onDownloadProgress: function (progressEvent) {
        this.onDownload(this.post, Math.trunc(progressEvent.loaded * 100 / progressEvent.total))
      }.bind({ post, onDownload })
    })
      .then((response) => response.data)
      .then((data) => data)
  }

  static getBlobURL = (post) => {
    switch (post.fileType) {
      case "webm":
      case "mp4":
        return post.fullURL

      default:
        return post.sampleURL
    }
  }
}