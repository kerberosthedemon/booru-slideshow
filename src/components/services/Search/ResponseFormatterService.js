import xmlJs from 'xml-js';

export class ResponseFormatterService {
  formatResponse = (response, booruConfiguration) => {
    return booruConfiguration.isXMLFormat ? this.formatFromXML(response) : this.formatFromJson(response)
  }

  formatFromXML = (response) => {
    let xmlResponse = response.data
    let jsonResponse = xmlJs.xml2js(xmlResponse, { compact: true, nativeType: true, nativeTypeAttributes: true })
    return jsonResponse.posts.post.map(element => element._attributes)
  }

  formatFromJson = (response) => {
    return response.data
  }
}