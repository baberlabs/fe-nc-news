import formatDate from "../../utilities/formatDate";

import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { deleteComment } from "../../utilities/api";
import { useState } from "react";

export default function CommentItem({ comment, setComments }) {
  const { loggedInUser } = useLoggedInUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasDeleteError, setHasDeleteError] = useState(false);

  function handleDeleteComment(e) {
    setIsDeleting(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setComments((previousComments) =>
          previousComments.filter(
            (prevComment) => prevComment.comment_id !== comment.comment_id,
          ),
        );
        setIsDeleting(false);
      })
      .catch((error) => {
        console.log(error);
        setHasDeleteError(true);
        setTimeout(() => setHasDeleteError(false), 3000);
      })
      .finally(() => setIsDeleting(false));
  }

  const ownComment = loggedInUser?.username === comment.author;

  return (
    <li className="relative flex flex-col gap-2 rounded border border-gray-300 bg-gray-100 p-4 shadow">
      <h4 className="font-bold underline">{comment.author}</h4>
      <p className="text-sm text-gray-700">{formatDate(comment.created_at)}</p>
      <p>{comment.body}</p>
      <p className="self-end text-sm text-gray-700">{comment.votes} votes</p>
      <div className="mt-2 flex flex-row gap-4 self-end">
        {ownComment ? (
          isDeleting ? (
            <Button bgColor="bg-gray-700" disabled>
              Deleting...
            </Button>
          ) : (
            <Button onClick={handleDeleteComment} bgColor="bg-red-700">
              Delete
            </Button>
          )
        ) : (
          <>
            <Button bgColor="bg-gray-700">Upvote</Button>
            <Button bgColor="bg-gray-700">Downvote</Button>
          </>
        )}
      </div>{" "}
      {hasDeleteError && (
        <p className="rounded-xl bg-red-200 px-4 py-2 text-sm">
          Comment couldn't be deleted. Try again!
        </p>
      )}
    </li>
  );
}

function Button({ children, bgColor, ...restProps }) {
  return (
    <button
      className={`rounded-xl ${bgColor} px-4 py-2 text-sm font-bold text-white`}
      {...restProps}
    >
      {children}
    </button>
  );
}
