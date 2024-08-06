import { useState, useEffect } from "react";
import { getArticleById } from "../../utilities/api";

export default function useArticle(article_id) {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState({});
  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  return { isLoading, article };
}
