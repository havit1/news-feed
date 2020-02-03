const NEWS_URL = "https://newsapi.org/v2/everything";

export class NewsFeed {
  constructor(root, source = "abc-news") {
    this._root = root;
    this._source = source;
    const news = [];

    this.init();
  }

  async fetchNews() {
    console.log(NEWS_URL + `?${this._source}`);

    const news = await fetch(NEWS_URL + `?sources=?${this._source}`, {
      method: "GET",
      headers: {
        "x-api-key": "ca68edd103994520b6f9d810f8a80563"
      }
    });
    const data = await news.json();
    console.log(data);
  }

  render() {}

  init() {
    this.fetchNews();
    this.render();
  }
}
