export default class Post {
  constructor(id, thumbURL, fullURL, thumbBlob, fullBlob) {
    this.id = id;
    this.thumbURL = thumbURL;
    this.fullURL = fullURL;
    this.thumbBlob = thumbBlob;
    this.fullBlob = fullBlob;
  }

  getRandom = () => {
    const imgBag = listaSFW

    return imgBag[Math.floor(Math.random() * imgBag.length)];
  }
}
// eslint-disable-next-line
const listaNSFW = [
  'https://static1.e621.net/data/sample/0d/f5/0df59cadae7f760a7e672db1e3168fb8.jpg',
  'https://static1.e621.net/data/sample/0f/9c/0f9c44df29b6389cef3fa077324d537a.jpg',
  'https://static1.e621.net/data/sample/d0/05/d00515f9c9ffcaffd3b49103aa7c7fcb.jpg',
  'https://static1.e621.net/data/sample/53/de/53de5b473aeced06ab32ead040d92c09.jpg',
  'https://static1.e621.net/data/sample/40/d6/40d6ae89a30d2304ed38b7d42cd7c88c.jpg',
  'https://static1.e621.net/data/sample/22/f6/22f65f83efe135acdff7d0c0ecb2be66.jpg',
  'https://static1.e621.net/data/sample/fe/1c/fe1c8b3f875c1f3bbefd6db873c2334b.jpg',
  'https://static1.e621.net/data/sample/b8/76/b876fc3269159ccd2d77fcb2c6ace5d7.jpg',
  'https://static1.e621.net/data/sample/81/3e/813e4e21ce2ebaecc0a50bc7a13401a8.jpg',
]

// eslint-disable-next-line
const listaSFW = [
  'https://safebooru.org//images/2551/200292afce74992d02dbb3c57e54a04101408525.jpg?2658696',
  'https://safebooru.org//images/2551/0bec0e254c8d771875b9706d8781d9789cc55392.jpg?2658686',
  'https://safebooru.org//samples/2551/sample_a1f12b97559dea02dc8c4f808a490280a0928f37.jpg?2658518',
  'https://safebooru.org//samples/2547/sample_ccd9eebc0dd0b1dd2a2a5e52815530b5b1ebd1f7.jpg?2654686',
  'https://safebooru.org//images/2501/4396a322d96f0f904b8593095e3cf48c1f412e1b.jpg?2608738',
  'https://safebooru.org//images/2370/462edf79afdcb3a5f4c5da17cbbda2d5e34948e7.jpg?2469458',
  'https://safebooru.org//images/2235/c1ef3509ef13376bb61491350c2a351c3430f6c6.png?2328553',
  'https://safebooru.org//images/2092/ab176fbb073f011230cee9befe126ee1d2bb5a58.png?2181440',
  'https://safebooru.org//images/2534/055e2f6600b5f89e3d9c831c4f224347fcf7dacb.png?2641904',
  'https://safebooru.org//images/578/9ce27af3e0e071a6114c8620e3a88ab0a7bf50cb.jpg?580536',
  'https://safebooru.org//images/1372/9a63e18d785420c9ead5bd81dfed2fc0e8dae277.jpg?1438265',
  'https://safebooru.org//images/2519/0379c127fb7a31a889e71f3307ebe78e28b7c9f6.jpg?2626236',
]