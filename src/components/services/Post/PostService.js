import Axios from "axios";

export default class PostService {
  loadPost = async (post, progress, error) => {
    return this.getBlob(post, progress, error)
  }

  getBlobURL = (post) => {
    switch (post.fileType) {
      case "webm":
      case "mp4":
        return post.fullURL

      default:
        return post.sampleURL
    }
  }

  async getBlob(post, progress, error) {
    return Axios.get(this.getBlobURL(post), {
      responseType: 'blob',
      onDownloadProgress: progress
    })
      .catch((reason) => { error(reason); })
      .then((response) => {
        return response.data;
      })
      .then((data) => URL.createObjectURL(data));
  }
}