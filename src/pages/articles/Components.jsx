import ArticleItem from "./ArticleItem";

export function ArticlesError({ error }) {
  console.log("C...", error);
  return (
    <section className="flex justify-center pt-32">
      <p className="flex flex-col items-center gap-1">
        <span className="text-7xl font-bold text-gray-400">
          {error?.status}
        </span>
        <span className="font-bold">{error?.message}</span>
      </p>
    </section>
  );
}

export function ArticlesHeading({ children, isLoading }) {
  const loading = isLoading ? "text-gray-400" : "";
  return (
    <h2 className={`text-xl font-bold ${loading} lg:text-2xl`}>{children}</h2>
  );
}

export function ArticlesList({ articles }) {
  return (
    <ul className="flex flex-row flex-wrap justify-center gap-8">
      {articles?.map((article) => (
        <ArticleItem key={article.article_id} article={article} />
      ))}
    </ul>
  );
}

export function LoadingText() {
  return <p className="self-center">Articles Loading...</p>;
}

export function ButtonMore({ onClick }) {
  return (
    <button className="self-center text-blue-600 underline" onClick={onClick}>
      More Articles...
    </button>
  );
}

export function NoMoreText() {
  return <p className="self-center">No More Articles</p>;
}
