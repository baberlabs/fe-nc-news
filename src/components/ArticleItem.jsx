import { Link } from "react-router-dom";
import formatDate from "../utilities/formatDate";

export default function ArticleItem({ article }) {
  function Topic() {
    return <p className="font-bold text-gray-500">#{article.topic}</p>;
  }

  function Heading() {
    return (
      <h3 className="font-black">
        <Link className="underline" to={`/articles/${article.article_id}`}>
          {article.title}
        </Link>
      </h3>
    );
  }

  function Author() {
    return (
      <p>
        <span>By </span>
        <Link
          className="text-blue-500 underline"
          to={`/users/${article.author}`}
        >
          {article.author}
        </Link>
      </p>
    );
  }

  function Date() {
    return (
      <p className="text-sm text-gray-500">{formatDate(article.created_at)}</p>
    );
  }

  function Image() {
    return (
      <img
        src={article.article_img_url}
        alt={`relating to ${article.topic}`}
        className="my-2 rounded-xl"
      />
    );
  }

  function VotesAndCommentsCount() {
    return (
      <div className="flex flex-row gap-4 self-end text-sm text-gray-500">
        <p>{article.votes} votes</p>
        <p>{article.comment_count} comments</p>
      </div>
    );
  }

  return (
    <li className="flex max-w-[500px] flex-col gap-2 rounded-xl border border-gray-300 bg-gray-200 p-4 shadow md:max-w-[400px]">
      <Topic />
      <Heading />
      <Author />
      <Date />
      <Image />
      <VotesAndCommentsCount />
    </li>
  );
}
