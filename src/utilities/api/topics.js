import { api } from "./config";

export function getTopics() {
  return api.get("/topics").then((response) => response.data.topics);
}
