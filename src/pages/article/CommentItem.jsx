import formatDate from "../../utilities/formatDate";

export default function CommentItem({ comment }) {
  return (
    <li className="flex flex-col gap-2 rounded border border-gray-300 bg-gray-100 p-4 shadow">
      <h4 className="font-bold underline">{comment.author}</h4>
      <p className="text-sm text-gray-700">{formatDate(comment.created_at)}</p>
      <p>{comment.body}</p>
      <p className="self-end text-sm text-gray-700">
        {comment.votes === 0
          ? `${comment.votes} votes`
          : comment.votes < 0
            ? `${comment.votes} downvotes`
            : `${comment.votes} upvotes`}
      </p>
      <div className="mt-2 flex flex-row gap-4 self-end">
        <button className="rounded-xl bg-gray-700 px-4 py-2 text-sm font-bold text-white">
          Upvote
        </button>
        <button className="rounded-xl bg-gray-700 px-4 py-2 text-sm font-bold text-white">
          Downvote
        </button>
      </div>
    </li>
  );
}
