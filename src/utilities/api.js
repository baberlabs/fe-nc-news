import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-8igb.onrender.com/api",
});

export function getArticles() {
  return api.get("/articles").then((response) => response.data.articles);
}
