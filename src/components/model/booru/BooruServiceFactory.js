import BooruService from './BooruService';

export default class BooruServiceFactory {

  static getBooruService(booruName) {
    switch (booruName.toUpperCase()) {
      case "E621":
        let e621Service = new BooruService()



        break;

      default:
        return null;
    }
  }
}