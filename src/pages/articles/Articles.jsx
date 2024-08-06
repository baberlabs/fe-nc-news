import { useState } from "react";
import { useArticles } from "./useArticles";
import {
  ArticlesHeading,
  ArticlesList,
  LoadingText,
  ButtonMore,
  NoMoreText,
} from "./Components";

export default function Articles() {
  const [page, setPage] = useState(1);
  const { isLoading, articles, totalCount } = useArticles(page);

  const hasMoreArticles = totalCount > articles.length && !isLoading;
  const hasNoMoreArticles = totalCount <= articles.length && !isLoading;

  return (
    <section className="flex flex-col gap-8 px-4 py-8">
      <ArticlesHeading />
      <ArticlesList articles={articles} />
      {isLoading && <LoadingText />}
      {hasMoreArticles && <ButtonMore setPage={setPage} />}
      {hasNoMoreArticles && <NoMoreText />}
    </section>
  );
}
