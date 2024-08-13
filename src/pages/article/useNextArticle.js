import { useEffect, useState } from "react";

export default function useNextArticle(article_id, articles) {
  const [nextArticle, setNextArticle] = useState({});
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    setCurrentArticleIndex((prev) => prev + 1);
    setNextArticle(() => {
      const filteredArticles = articles.filter(
        (article) => article.article_id !== Number(article_id),
      );
      return filteredArticles[currentArticleIndex + 1]
        ? filteredArticles[currentArticleIndex + 1]
        : filteredArticles[0];
    });
  }, [articles, article_id]);

  return { nextArticle };
}
