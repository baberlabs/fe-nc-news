import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-8igb.onrender.com/api",
});

export function getArticles(page) {
  const route = "/articles";
  const options = {
    params: { page },
  };
  return api.get(route, options).then((response) => response.data);
}

export function getArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article);
}

export function getCommentsByArticleId(article_id, page) {
  const route = `/articles/${article_id}/comments`;
  const options = {
    params: { page },
  };
  return api.get(route, options).then(({ data }) => data);
}

export function voteArticle(article_id, inc_votes) {
  const route = `/articles/${article_id}`;
  const options = { inc_votes };
  return api.patch(route, options).then(({ data }) => data);
}
