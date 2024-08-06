import axios from "axios";

export const api = axios.create({
  baseURL: "https://be-nc-news-8igb.onrender.com/api",
});
