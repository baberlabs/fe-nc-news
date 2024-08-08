import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useArticles } from "./useArticles";

import Filters from "./Filters";

import {
  ArticlesHeading,
  ArticlesList,
  LoadingText,
  ButtonMore,
  NoMoreText,
} from "./Components";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "all";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const [page, setPage] = useState(1);

  const { isLoading, articles, totalCount } = useArticles({
    page,
    topic: topic === "all" ? undefined : topic,
    sort_by: sortBy,
    order,
  });

  const hasMoreArticles = totalCount > articles.length && !isLoading;
  const hasNoMoreArticles = totalCount <= articles.length && !isLoading;

  return (
    <section className="flex flex-col gap-8 px-4 py-8">
      <Filters
        setPage={setPage}
        setSearchParams={setSearchParams}
        topic={topic}
        sortBy={sortBy}
        order={order}
      />
      {isLoading && (
        <ArticlesHeading isLoading>Loading {topic} articles...</ArticlesHeading>
      )}
      {!isLoading && (
        <ArticlesHeading>Showing {topic} articles</ArticlesHeading>
      )}
      <ArticlesList articles={articles} />
      {isLoading && <LoadingText />}
      {hasMoreArticles && (
        <ButtonMore onClick={() => loadMoreArticles(setPage)} />
      )}
      {hasNoMoreArticles && <NoMoreText />}
    </section>
  );
}
