import formatDate from "../../utilities/formatDate";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";

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

export function Button({ children, color, handleClick }) {
  return (
    <button
      className={`rounded-xl bg-${color}-700 w-fit px-4 py-2 text-sm font-bold text-white`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export function CommentsHeading() {
  return <h3 className="mt-2 text-2xl">Comments</h3>;
}

export function CommentsList({ comments }) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment.comment_id} comment={comment} />
      ))}
    </ul>
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
