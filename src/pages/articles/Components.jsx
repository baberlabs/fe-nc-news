import ArticleItem from "./ArticleItem";

export function ArticlesHeading() {
  return <h2 className="hidden">Articles</h2>;
}

export function ArticlesList({ articles }) {
  return (
    <ul className="flex flex-row flex-wrap justify-center gap-8">
      {articles.map((article) => (
        <ArticleItem key={article.article_id} article={article} />
      ))}
    </ul>
  );
}

export function LoadingText() {
  return <p className="self-center">Articles Loading...</p>;
}

export function ButtonMore({ setPage }) {
  function handleMoreArticles() {
    setPage((previousPage) => previousPage + 1);
  }

  return (
    <button
      className="self-center text-blue-500 underline"
      onClick={handleMoreArticles}
    >
      More Articles...
    </button>
  );
}

export function NoMoreText() {
  return <p className="self-center">No More Articles</p>;
}
