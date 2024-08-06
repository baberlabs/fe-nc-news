import { useState, useEffect } from "react";
import { getArticles } from "../../utilities/api";

export function useArticles(articlesPage) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticles(articlesPage).then((data) => {
      setIsLoading(false);
      setArticles((previousArticles) => [
        ...previousArticles,
        ...data.articles,
      ]);
      setTotalCount(data.total_count);
    });
  }, [articlesPage]);

  return { isLoading, articles, totalCount };
}
