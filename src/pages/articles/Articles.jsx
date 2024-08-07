import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useArticles } from "./useArticles";
import {
  TopicDropDown,
  ArticlesHeading,
  ArticlesList,
  LoadingText,
  ButtonMore,
  NoMoreText,
} from "./Components";

import useTopics from "./useTopics";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "all";

  const [page, setPage] = useState(1);

  const { isLoading, articles, totalCount } = useArticles({
    page,
    topic: topic === "all" ? undefined : topic,
  });

  const { topics } = useTopics();

  function handleSelectChange(e) {
    setPage(1);
    const currentTopic = e.target.value;
    setSearchParams(currentTopic === "all" ? {} : { topic: currentTopic });
  }

  function loadMoreArticles() {
    setPage((previousPage) => previousPage + 1);
  }

  const hasMoreArticles = totalCount > articles.length && !isLoading;
  const hasNoMoreArticles = totalCount <= articles.length && !isLoading;

  return (
    <section className="flex flex-col gap-8 px-4 py-8">
      <TopicDropDown
        onChange={handleSelectChange}
        selectedTopic={topic}
        topics={topics}
      />
      {isLoading ? (
        <ArticlesHeading isLoading>Loading {topic} articles...</ArticlesHeading>
      ) : (
        <ArticlesHeading>Showing {topic} articles</ArticlesHeading>
      )}
      <ArticlesList articles={articles} />
      {isLoading && <LoadingText />}
      {hasMoreArticles && <ButtonMore onClick={loadMoreArticles} />}
      {hasNoMoreArticles && <NoMoreText />}
    </section>
  );
}
