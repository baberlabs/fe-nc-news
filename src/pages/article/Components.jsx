import { Link, useParams } from "react-router-dom";

import CommentItem from "./CommentItem";

import formatDate from "../../utilities/formatDate";
import { voteArticle } from "../../utilities/api";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";

export function ArticleLoadingText() {
  return <p>Loading...</p>;
}

export function Topic({ topic }) {
  return <p className="font-bold text-gray-500">#{topic}</p>;
}

export function Heading({ title }) {
  return <h2 className="text-2xl font-black">{title}</h2>;
}

export function Author({ author }) {
  return (
    <p>
      <span>By </span>
      <Link className="text-blue-500 underline" to={`/users/${author}`}>
        {author}
      </Link>
    </p>
  );
}

export function Date({ date }) {
  return <p className="text-sm text-gray-500">{formatDate(date)}</p>;
}

export function Image({ src, topic }) {
  return <img className="my-2" src={src} alt={`relating to ${topic}`} />;
}

export function Body({ body }) {
  return <p>{body}</p>;
}

export function CountsContainer({ children }) {
  return (
    <div className="flex flex-row gap-4 text-sm text-gray-500">{children}</div>
  );
}

export function Count({ children, label }) {
  return (
    <p>
      {children} {label}
    </p>
  );
}

export function ButtonsContainer({ children, self }) {
  return <div className={`flex flex-row gap-4 self-${self}`}>{children}</div>;
}

export function Button({
  children,
  color,
  inc_votes,
  setCurrentVotes,
  setVotesError,
  setVotesNotLoggedInError,
}) {
  const { article_id } = useParams();
  const { loggedInUser } = useLoggedInUser();

  function handleVote() {
    if (!loggedInUser?.username) {
      setVotesNotLoggedInError(true);
      setTimeout(() => {
        setVotesNotLoggedInError(false);
      }, 3000);
      return;
    }
    setVotesNotLoggedInError(false);
    if (inc_votes) {
      setCurrentVotes((previousVotes) => previousVotes + inc_votes);
      voteArticle(article_id, inc_votes).catch(() => {
        setCurrentVotes((previousVotes) => previousVotes - inc_votes);
        setVotesError(true);
        setTimeout(() => {
          setVotesError(false);
        }, 3000);
      });
    }
  }

  const colors = ["bg-blue-700", "bg-green-700"];

  return (
    <button
      className={`w-fit rounded-xl bg-${color}-700 px-4 py-2 text-sm font-bold text-white`}
      onClick={handleVote}
    >
      {children}
    </button>
  );
}

export function VotesErrorText() {
  return (
    <p className="w-fit rounded-xl bg-red-200 px-4 py-2">
      Sorry, that didn't work. Try again!
    </p>
  );
}

export function VotesNotLoggedInErrorText() {
  return (
    <p className="w-fit rounded-xl bg-red-200 px-4 py-2 text-sm">
      Please login to vote
    </p>
  );
}

export function CommentsHeading() {
  return <h3 className="mt-2 text-2xl">Comments</h3>;
}

export function CommentsList({ comments, setComments }) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
          setComments={setComments}
        />
      ))}
    </ul>
  );
}

export function CommentForm({ children }) {
  return <form className="flex flex-col gap-4">{children}</form>;
}

export function CommentInputField({ ...restProps }) {
  return (
    <textarea
      className="h-28 w-full resize-none rounded border border-gray-300 px-4 py-2"
      placeholder="Write a public comment"
      {...restProps}
    ></textarea>
  );
}

export function CommentsLoadingText() {
  return <p className="my-4 self-center">Loading...</p>;
}

export function ButtonMoreComments({ setPage }) {
  function handleMoreComments() {
    setPage((previousPage) => previousPage + 1);
  }
  return (
    <button
      onClick={handleMoreComments}
      id="btn-more-comments"
      className="my-4 self-center text-blue-500 underline"
    >
      Load More Comments...
    </button>
  );
}

export function NoMoreComponentsText() {
  return <p className="my-4 self-center">No More Comments</p>;
}

export function ButtonComment({ submitComment }) {
  return (
    <button
      onClick={submitComment}
      type="submit"
      className="self-end rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white"
    >
      Comment
    </button>
  );
}

export function ButtonCommentDisabled() {
  return (
    <button
      type="submit"
      className="self-end rounded-xl bg-gray-300 px-4 py-2 text-sm font-bold text-black"
      disabled
    >
      Commenting...
    </button>
  );
}

export function ButtonLogIn() {
  return (
    <Link
      to="/login"
      className="self-end rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white"
    >
      Log In To Comment
    </Link>
  );
}
