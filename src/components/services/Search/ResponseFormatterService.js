import xmlJs from 'xml-js';

export class ResponseFormatterService {
  formatResponse = (response, booruConfiguration) => {
    return booruConfiguration.isXMLFormat ? this.formatFromXML(response) : this.formatFromJson(response, booruConfiguration);
  }

  formatFromXML = (response) => {
    let xmlResponse = response.data;
    let jsonResponse = xmlJs.xml2js(xmlResponse, { compact: true, nativeType: true });
    if (jsonResponse['posts'].post)
      return jsonResponse['posts'].post.map(element => element._attributes);
    else
      return [];
  }

  formatFromJson = (response, booruConfiguration) => {
    return booruConfiguration.responseDataObject ? response.data[booruConfiguration.responseDataObject] : response.data;
  }
}