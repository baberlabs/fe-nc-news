import { api } from "./config";

export function getCommentsByArticleId(article_id, page) {
  return api
    .get(`/articles/${article_id}/comments`, { params: { page } })
    .then(({ data }) => data);
}

export function postComment(article_id, username, body) {
  return api
    .post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data }) => data);
}
