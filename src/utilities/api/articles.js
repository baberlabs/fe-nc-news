import { api } from "./config";

export function getArticles({ ...params }) {
  return api
    .get("/articles", { params: { ...params } })
    .then((response) => response.data);
}

export function getArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      throw error;
    });
}

export function voteArticle(article_id, inc_votes) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => data);
}
