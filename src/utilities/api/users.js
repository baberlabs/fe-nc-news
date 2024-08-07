import { api } from "./config";

export function getUser(username) {
  return api.get(`/users/${username}`).then(({ data }) => data.user);
}
