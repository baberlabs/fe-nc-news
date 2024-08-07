import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  CommentsHeading,
  CommentsList,
  CommentForm,
  CommentInputField,
  CommentsLoadingText,
  ButtonMoreComments,
  NoMoreComponentsText,
  ButtonComment,
  ButtonCommentDisabled,
  ButtonLogIn,
} from "./Components";

import { postComment } from "../../utilities/api";

import useComments from "./useComments";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";

export default function Comments({}) {
  const { article_id } = useParams();
  const { loggedInUser } = useLoggedInUser();
  const [page, setPage] = useState(1);
  const [commentInput, setCommentInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { areCommentsLoading, comments, setComments, totalCount } = useComments(
    article_id,
    page,
  );

  function updateCommentText(e) {
    setCommentInput(e.target.value);
  }

  function submitComment(e) {
    e.preventDefault();

    if (!commentInput.trim()) return;
    setIsPosting(true);
    postComment(article_id, loggedInUser?.username, commentInput)
      .then(({ comment }) => {
        setComments((previousComments) => [comment, ...previousComments]);
        setCommentInput("");
      })
      .finally(() => {
        setIsPosting(false);
      });
  }

  const hasMoreComments = totalCount > comments.length && !areCommentsLoading;
  const hasNoMoreComments =
    totalCount <= comments.length && !areCommentsLoading;
  const isLoggedIn = loggedInUser?.username;
  const canComment = isLoggedIn && !isPosting;
  const canNotComment = isLoggedIn && isPosting;

  return (
    <>
      <CommentsHeading />
      <CommentForm>
        <CommentInputField onChange={updateCommentText} value={commentInput} />
        {!isLoggedIn && <ButtonLogIn />}
        {canComment && <ButtonComment submitComment={submitComment} />}
        {canNotComment && <ButtonCommentDisabled />}
      </CommentForm>
      <CommentsList comments={comments} setComments={setComments} />
      {areCommentsLoading && <CommentsLoadingText />}
      {hasMoreComments && <ButtonMoreComments setPage={setPage} />}
      {hasNoMoreComments && <NoMoreComponentsText />}
    </>
  );
}
