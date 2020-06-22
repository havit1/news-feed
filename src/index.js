import { Header } from "./Components/Header/Header";
import { NewsFeed } from "./Components/NewsFeed/NewsFeed";
import "./index.css";

const header = new Header();
const newsFeed = new NewsFeed();

window.addEventListener("load", e => {
  render();
});

async function render() {
  await header.init();
  newsFeed.init();

  select.addEventListener("change", e => {
    newsFeed.updateNews(e.currentTarget.value);
  });
}

//test
//test