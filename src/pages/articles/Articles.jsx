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
  ArticlesError,
} from "./Components";

import { loadMoreArticles } from "./functions";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "select";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const [page, setPage] = useState(1);

  const { isLoading, articles, articlesError, hasArticlesError, totalCount } =
    useArticles({
      page,
      topic: topic === "all" || topic === "select" ? undefined : topic,
      sort_by: sortBy,
      order,
      setSearchParams,
    });

  const hasMoreArticles =
    totalCount > articles?.length && !isLoading && !hasArticlesError;

  const hasNoMoreArticles =
    totalCount <= articles?.length && !isLoading && !hasArticlesError;

  return (
    <section className="flex flex-col gap-8 px-4 py-8">
      <Filters
        setPage={setPage}
        setSearchParams={setSearchParams}
        topic={topic}
        sortBy={sortBy}
        order={order}
        hasArticlesError={hasArticlesError}
      />
      {isLoading && (
        <ArticlesHeading isLoading>Loading {topic} articles...</ArticlesHeading>
      )}

      {!hasArticlesError && !isLoading && (
        <ArticlesHeading>
          Showing {topic === "select" ? "all" : topic} articles
        </ArticlesHeading>
      )}
      {hasArticlesError && !isLoading && (
        <ArticlesError error={articlesError} />
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
