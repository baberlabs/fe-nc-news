import { useState, useEffect } from "react";
import { getArticles } from "../../utilities/api";

export function useArticles({ page, topic }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticles({ page, topic })
      .then((data) => {
        if (page === 1) {
          setArticles(data.articles);
        } else {
          setArticles((previousArticles) => [
            ...previousArticles,
            ...data.articles,
          ]);
        }
        setTotalCount(data.total_count);
      })
      .finally(() => setIsLoading(false));
  }, [page, topic]);

  return {
    isLoading,
    articles,
    totalCount,
  };
}
