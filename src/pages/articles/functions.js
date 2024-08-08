import capitaliseString from "../../utilities/capitaliseString";

export function handleTopicChange(e, setPage, setSearchParams) {
  setPage(1);
  const currentTopic = e.target.value;
  setSearchParams((searchParams) => {
    if (currentTopic !== "select") {
      searchParams.set("topic", currentTopic);
    }
    return searchParams;
  });
}

export function handleSortByChange(e, setPage, setSearchParams) {
  setPage(1);
  const currentSortBy = e.target.value;
  setSearchParams((searchParams) => {
    searchParams.set("sort_by", currentSortBy);
    return searchParams;
  });
}

export function handleOrderChange(e, setPage, setSearchParams) {
  setPage(1);
  const currentOrder = e.target.value;
  setSearchParams((searchParams) => {
    searchParams.set("order", currentOrder);
    return searchParams;
  });
}

export function loadMoreArticles(setPage) {
  setPage((previousPage) => previousPage + 1);
}

export function isValidTopic(topic, topics) {
  return (
    topic === "all" || topics.some((validTopic) => validTopic.slug === topic)
  );
}

export function getTopicOptions(topics) {
  const array = Object.values(topics).map((topic) => topic.slug);
  const object = { select: "Select a topic", all: "All" };
  for (const item of array) {
    object[item] = capitaliseString(item);
  }
  return object;
}
