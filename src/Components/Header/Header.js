const SOURCES_URL = "https://newsapi.org/v2/sources";

export class Header {
  constructor(root = document.getElementById("root")) {
    this._root = root;
    this._sources = [];
    this.init();
  }

  async fetchSources() {
    const sources = await fetch(SOURCES_URL, {
      method: "GET",
      headers: {
        "x-api-key": "ca68edd103994520b6f9d810f8a80563"
      }
    });
    const data = await sources.json();

    this._sources = data.sources;
  }

  renderOptions = (id, name, root) => {
    const option = document.createElement("option");
    option.value = id;
    option.text = name;

    root.appendChild(option);
  };

  async render() {
    const navBar = document.createElement("nav");

    const sourceSelect = document.createElement("select");
    sourceSelect.id = "select";

    this._sources.map(src =>
      this.renderOptions(src.id, src.name, sourceSelect)
    );

    navBar.appendChild(sourceSelect);

    this._root.appendChild(navBar);
  }

  async init() {
    await this.fetchSources();
    this.render();

    const select = document.getElementById("select");

    select.addEventListener("change", e => console.log(e.currentTarget.value));
  }
}
