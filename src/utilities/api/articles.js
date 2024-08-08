import { api } from "./config";

export function getArticles({ ...params }) {
  return api
    .get("/articles", { params: { ...params } })
    .then((response) => response.data)
    .catch((error) => {
      throw {
        status: error.response.status,
        message: error.response.data.message,
      };
    });
}

export function getArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      throw {
        status: error.response.status,
        message: error.response.data.message,
      };
    });
}

export function voteArticle(article_id, inc_votes) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => data);
}
