export default function useArticles() {
  const setTopic = useCallback(
    (newTopic) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("topic", newTopic);
        return newParams;
      });
    },
    [setSearchParams],
  );
}
