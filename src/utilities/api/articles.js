import { api } from "./config";

export function getArticles(page) {
  return api
    .get("/articles", { params: { page } })
    .then((response) => response.data);
}

export function getArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article);
}

export function voteArticle(article_id, inc_votes) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => data);
}
