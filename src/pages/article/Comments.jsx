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
  const [submitError, setSubmitError] = useState("");

  function updateCommentText(e) {
    setCommentInput(e.target.value);
  }

  function submitComment(e) {
    e.preventDefault();

    if (!commentInput.trim()) {
      setHasSubmitError(true);
      setSubmitError("Comment cannot be empty!");
      setTimeout(() => setHasSubmitError(false), 3000);
      return;
    }

    setIsPosting(true);
    postComment(article_id, loggedInUser?.username, commentInput)
      .then(({ comment }) => {
        setComments((previousComments) => [comment, ...previousComments]);
        setCommentInput("");
      })
      .catch(() => {
        setHasSubmitError(true);
        setSubmitError("Could not submit your comment, try again!");
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

  return (
    <>
      <CommentsHeading />
      <CommentForm onSubmit={submitComment}>
        {isLoggedIn && <LoggedInAsText user={loggedInUser} />}
        <CommentInputField
          onChange={updateCommentText}
          value={commentInput}
          onSubmit={submitComment}
        />
        {!isLoggedIn && <ButtonLogIn />}
        {canComment && <ButtonComment />}
        {canNotComment && <ButtonCommentDisabled />}
        {hasSubmitError && <CommentSubmitError submitError={submitError} />}
      </CommentForm>
      <CommentsList comments={comments} setComments={setComments} />
      {areCommentsLoading && <CommentsLoadingText />}
      {hasMoreComments && <ButtonMoreComments setPage={setPage} />}
      {hasNoMoreComments && <NoMoreComponentsText />}
    </>
  );
}
