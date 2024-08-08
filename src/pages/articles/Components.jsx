import ArticleItem from "./ArticleItem";
import capitaliseString from "../../utilities/capitaliseString";

export function ArticlesHeading({ children, isLoading }) {
  const loading = isLoading ? "text-gray-400" : "";
  return <h2 className={`text-xl font-bold ${loading}`}>{children}</h2>;
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

export function ButtonMore({ onClick }) {
  return (
    <button className="self-center text-blue-500 underline" onClick={onClick}>
      More Articles...
    </button>
  );
}

export function NoMoreText() {
  return <p className="self-center">No More Articles</p>;
}
