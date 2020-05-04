import Axios from "axios";

export default class PostService {
  loadPost = async (post, progress, error) => {
    return Axios.get(PostService.getBlobURL(post), {
      responseType: 'blob',
      onDownloadProgress: progress
    })
      .catch((reason) => { error(reason) })
      .then((response) => response.data)
      .then((data) => URL.createObjectURL(data))
  }

  function(progressEvent) {
    this.onDownload(this.post, Math.trunc(progressEvent.loaded * 100 / progressEvent.total))
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