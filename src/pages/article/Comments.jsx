import useComments from "./useComments";

import {
  CommentsHeading,
  CommentsList,
  CommentsLoadingText,
  ButtonMoreComments,
  NoMoreComponentsText,
} from "./Components";

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Comments({}) {
  const { article_id } = useParams();
  const [page, setPage] = useState(1);
  const { isLoading, comments, totalCount } = useComments(article_id, page);

  const hasMoreComments = totalCount > comments.length && !isLoading;
  const hasNoMoreComments = totalCount <= comments.length && !isLoading;

  return (
    <>
      <CommentsHeading />
      <CommentsList comments={comments} />
      {isLoading && <CommentsLoadingText />}
      {hasMoreComments && <ButtonMoreComments setPage={setPage} />}
      {hasNoMoreComments && <NoMoreComponentsText />}
    </>
  );
}
