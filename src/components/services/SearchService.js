import Axios from "axios";
import xmlJs from 'xml-js';
import Post from './../model/Post';
import { PostFactory } from "./Search/PostFactory";
import { BooruConfiguration } from "../model/BooruConfiguration";

const axios = Axios

export default class SearchService {
  
  postFactory = new PostFactory();

  constructor(baseURL, startPage = 0, isXMLFormat = true, postLimitPerRequest = 50) {
    this.baseURL = baseURL
    this.startPage = startPage
    this.isXMLFormat = isXMLFormat
    this.postLimitPerRequest = postLimitPerRequest

    this.currentSearchPage = this.startPage
    this.currentSearchTags = []
  }

  search = async (searchQuery, booruConfiguration) => {
    this.currentSearchPage = this.startPage
    this.currentSearchTags = searchText.split(" ")
    return this.searchNextPage(searchQuery, booruConfiguration);
  }

  searchNextPage = async (searchQuery, booruConfiguration) => {
    let response = await axios.get(this.getRequestString(), { credentials: 'include' })
    const jsonResponse = this.isXMLFormat ? this.formatFromXML(response) : this.formatFromJson(response)
    this.currentSearchPage++
    return new Promise((resolve, reject) => { resolve(jsonResponse.map(jsonPost => {
      try{
        return this.convertToPost(jsonPost)
      }
      catch(exception){
        return null;
      }
    }).filter(element => element !== null)) })
  }

  getRequestString() {
    return this.baseURL + this.getTagsQuery(this.currentSearchTags) + this.getPageQuery(this.currentSearchPage) + this.getLimitQuery(this.postLimitPerRequest);
  }

  getTagsQuery(tags) {
    let query = "&tags="
    if (tags)
      tags.forEach((tag) => { query = query.concat("+" + tag) });
    return query;
  }

  getPageQuery(page) {
    return (this.isXMLFormat ? "&pid=" : "&page=") + page;
  }

  getLimitQuery(limit) {
    return "&limit=" + limit;
  }

  formatFromXML = (response) => {
    let xmlResponse = response.data
    let jsonResponse = xmlJs.xml2js(xmlResponse, { compact: true, nativeType: true, nativeTypeAttributes: true })
    return jsonResponse.posts.post.map(element => element._attributes)
  }

  formatFromJson = (response) => {
    return response.data
  }

  convertToPost = (postJson, booruConfiguration) => {
    return this.postFactory.generateNewPost(postJson, booruConfiguration)
  }

  getPostIdFromJson = (json) => {
    return json.id
  }

  getPreviewURLFromJson = (json) => {
    return json.preview_url
  }

  getSampleURLFromJson = (json) => {
    return json.sample_url
  }

  getFileURLFromJson = (json) => {
    return json.file_url
  }

  getFileWidthFromJson = (json) => {
    return json.width
  }

  getFileHeightFromJson = (json) => {
    return json.height
  }

  getTagsFromJson = (json) => {
    return json.tags.split(' ').filter(el => el !== "");
  }

  getArtistsFromJson = (json) => {
    return this.isXMLFormat ? [json.artist] : json.artist
  }

  getRatingFromJson(json) {
    switch (json.rating) {
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

  static getFullBlobURL = async (post, onDownload) => {
    return axios.get(SearchService.getBlobURL(post), { responseType: 'blob', 
    onDownloadProgress: function (progressEvent) {
    this.onDownload(this.post, Math.trunc(progressEvent.loaded * 100 / progressEvent.total))
    }.bind({post, onDownload}) })
      .then((response) => response.data)
      .then((data) => data)
  }

  static handleDownloadProgress = (progressEvent) => {
    console.log("Progress event", progressEvent)
    console.log("This", this)
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