const NEWS_URL = "https://newsapi.org/v2/top-headlines?";

export class NewsFeed {
  constructor(root = document.getElementById("root"), source = "abc-news") {
    this._root = root;
    this._source = source;
    this._news = [];
  }

  async fetchNews() {
    const news = await fetch(NEWS_URL + `sources=${this._source}`, {
      method: "GET",
      headers: {
        "x-api-key": "ca68edd103994520b6f9d810f8a80563"
      }
    });
    const data = await news.json();

    this._news = data
  }

  render() {
    const section = document.createElement("section");
    section.classList.add("container");

    const newsWrapper = document.createElement("div");

    const newsList = document.createElement("ul");
    newsList.id = "newsList";
    newsList.classList.add("row", "row-cols-1", "row-cols-md-2");

    this._news.articles.map(article =>
      this.renderNews(
        article.source.name,
        article.title,
        article.url,
        article.urlToImage,
        newsList
      )
    );

    newsWrapper.appendChild(newsList);
    section.appendChild(newsWrapper);
    this._root.appendChild(section);
  }

  renderNews = (source, title, url, urlToImage, root) => {
    const newsElement = document.createElement("div");
    newsElement.id = "newsElement";
    newsElement.classList.add("card");

    const image = document.createElement("img");
    image.src = `${urlToImage}`;
    image.id = "image";
    image.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.id = "cardBody";
    cardBody.classList.add("card-body");

    const titleField = document.createElement("h1");
    titleField.textContent = title;
    titleField.id = "titleField";
    titleField.classList.add("card-title");

    const sourceField = document.createElement("h3");
    sourceField.textContent = source;
    sourceField.id = "sourceField";
    sourceField.classList.add("card-text");

    const link = document.createElement("a");
    link.href = `${url}`;
    link.text = "To article";
    link.id = "link";
    link.classList.add("btn", "btn-primary");

    const newsElementWrapper = document.createElement("div");
    newsElementWrapper.id = "newsElementWrapper";
    newsElementWrapper.classList.add("col", "mb-4");

    newsElement.appendChild(image);
    cardBody.appendChild(titleField);
    cardBody.appendChild(sourceField);
    cardBody.appendChild(link);
    newsElement.appendChild(cardBody);
    newsElementWrapper.appendChild(newsElement);

    return root.appendChild(newsElementWrapper);
  };

  async init() {
    await this.fetchNews();
    this.render();
  }

  updatedNewsRender(source, title, url, urlToImage, root) {
    const newsElement = document.getElementById("newsElement");

    const sourceField = document.getElementById("sourceField");
    sourceField.textContent = source;

    const titleField = document.getElementById("titleField");
    titleField.textContent = title;

    const image = document.getElementById("image");
    image.src = `${urlToImage}`;

    const link = document.getElementById("link");

    link.href = `${url}`;
    link.text = "To article";

    const newsElementWrapper = document.getElementById("newsElementWrapper");
    const cardBody = document.getElementById("cardBody");

    newsElement.appendChild(image);
    cardBody.appendChild(titleField);
    cardBody.appendChild(sourceField);
    cardBody.appendChild(link);
    newsElement.appendChild(cardBody);
    newsElementWrapper.appendChild(newsElement);

    return root.appendChild(newsElementWrapper);
  }

  async updateNews(source) {
    this._source = source;
    await this.fetchNews();

    const newsList = document.getElementById("newsList");

    this._news.articles.map(article =>
      this.updatedNewsRender(
        article.source.name,
        article.title,
        article.url,
        article.urlToImage,
        newsList
      )
    );
  }
}
