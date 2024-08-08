export function handleTopicChange(e, setPage, setSearchParams) {
  setPage(1);
  const currentTopic = e.target.value;
  if (currentTopic !== "all") {
    setSearchParams((searchParams) => {
      searchParams.set("topic", currentTopic);
      return searchParams;
    });
  } else {
    setSearchParams((searchParams) => {
      if (searchParams.has("topic")) {
        searchParams.delete("topic");
        return searchParams;
      }
    });
  }
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
