import { useState, useEffect } from "react";
import { getArticleById } from "../../utilities/api";

export default function useArticle(article_id) {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState({});
  const [articleError, setArticleError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => setArticle(article))
      .catch((error) => setArticleError(error))
      .finally(() => setIsLoading(false));
  }, [article_id]);

  return { isLoading, article, articleError };
}
