import Axios from "axios";

export default class PostService {
  loadPost = async (post, progress, error) => {

    const getBlobURL = (post) => {
      switch (post.fileType) {
        case "webm":
        case "mp4":
          return post.fullURL

        default:
          return post.sampleURL
      }
    }

    return Axios.get(getBlobURL(post), {
      responseType: 'blob',
      onDownloadProgress: progress
    })
      .catch((reason) => { error(reason) })
      .then((response) => {
        return response.data;
      })
      .then((data) => URL.createObjectURL(data))
  }
}