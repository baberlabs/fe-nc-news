import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  CommentsHeading,
  LoggedInAsText,
  CommentsList,
  CommentForm,
  CommentInputField,
  CommentsLoadingText,
  ButtonMoreComments,
  NoMoreComponentsText,
  ButtonComment,
  ButtonCommentDisabled,
  ButtonLogIn,
  CommentSubmitError,
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
  const [hasSubmitError, setHasSubmitError] = useState(false);

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
      .catch(() => {
        setHasSubmitError(true);
        setTimeout(() => setHasSubmitError(false), 3000);
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

  console.log(loggedInUser);
  return (
    <>
      <CommentsHeading />
      <CommentForm>
        {isLoggedIn && <LoggedInAsText user={loggedInUser} />}
        <CommentInputField onChange={updateCommentText} value={commentInput} />
        {!isLoggedIn && <ButtonLogIn />}
        {canComment && <ButtonComment submitComment={submitComment} />}
        {canNotComment && <ButtonCommentDisabled />}
        {hasSubmitError && <CommentSubmitError />}
      </CommentForm>
      <CommentsList comments={comments} setComments={setComments} />
      {areCommentsLoading && <CommentsLoadingText />}
      {hasMoreComments && <ButtonMoreComments setPage={setPage} />}
      {hasNoMoreComments && <NoMoreComponentsText />}
    </>
  );
}
