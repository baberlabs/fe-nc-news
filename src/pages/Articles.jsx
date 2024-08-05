import { useEffect, useState } from "react";
import { getArticles } from "../utilities/api";
import ArticleItem from "../components/ArticleItem";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then((articles) => {
      setIsLoading(false);
      setArticles(articles);
    });
  }, []);

  return (
    <section className="px-4 py-8">
      <h2 className="hidden">Articles</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-row flex-wrap justify-center gap-8">
          {articles.map((article) => (
            <ArticleItem key={article.article_id} article={article} />
          ))}
        </ul>
      )}
    </section>
  );
}
