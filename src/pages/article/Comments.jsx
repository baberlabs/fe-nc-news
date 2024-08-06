import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  CommentsHeading,
  CommentsList,
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
  const { isLoading, comments, setComments, totalCount } = useComments(
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

  const hasMoreComments = totalCount > comments.length && !isLoading;
  const hasNoMoreComments = totalCount <= comments.length && !isLoading;
  const isLoggedIn = loggedInUser?.username;
  const isCommenting = loggedInUser?.username && isPosting;

  return (
    <>
      <CommentsHeading />
      <form className="flex flex-col gap-4">
        <textarea
          onChange={updateCommentText}
          name="new-comment"
          id="new-comment"
          className="h-28 w-full resize-none rounded border border-gray-300 px-4 py-2"
          placeholder="Write a public comment"
          value={commentInput}
        ></textarea>
        {!isLoggedIn ? (
          <ButtonLogIn />
        ) : isCommenting ? (
          <ButtonCommentDisabled />
        ) : (
          <ButtonComment submitComment={submitComment} />
        )}
      </form>
      <CommentsList comments={comments} />
      {isLoading && <CommentsLoadingText />}
      {hasMoreComments && <ButtonMoreComments setPage={setPage} />}
      {hasNoMoreComments && <NoMoreComponentsText />}
    </>
  );
}
