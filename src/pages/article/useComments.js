import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../../utilities/api";

export default function useComments(article_id, commentsPage) {
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setAreCommentsLoading(true);
    getCommentsByArticleId(article_id, commentsPage).then((data) => {
      setComments((previousComments) => [
        ...previousComments,
        ...data.comments,
      ]);
      setTotalCount(data.total_count);
      setAreCommentsLoading(false);
    });
  }, [article_id, commentsPage]);

  return { areCommentsLoading, comments, totalCount };
}
