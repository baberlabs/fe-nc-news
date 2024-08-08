import { useState, useEffect } from "react";
import { getArticles } from "../../utilities/api";

export function useArticles({ page, topic, sort_by, order, setSearchParams }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [articlesError, setArticlesError] = useState({});
  const [hasArticlesError, setHasArticlesError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles({ page, topic, sort_by, order })
      .then((data) => {
        if (page === 1) {
          setArticles(data.articles);
        } else {
          setArticles((previousArticles) => [
            ...previousArticles,
            ...data.articles,
          ]);
        }
        setHasArticlesError(false);
        setTotalCount(data.total_count);
      })
      .catch((error) => {
        setArticlesError(error);
        setHasArticlesError(true);
      })
      .finally(() => setIsLoading(false));
  }, [page, topic, sort_by, order, setSearchParams]);

  return { isLoading, articles, articlesError, hasArticlesError, totalCount };
}
