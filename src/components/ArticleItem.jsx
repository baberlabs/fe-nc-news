import { Link } from "react-router-dom";
import formatDate from "../utilities/formatDate";

export default function ArticleItem({ article }) {
  return (
    <li className="flex max-w-[500px] flex-col gap-2 rounded-xl bg-gray-200 p-4 shadow-xl md:max-w-[400px]">
      <h3 className="font-black">
        <Link className="underline" to={`/articles/${article.article_id}`}>
          {article.title}
        </Link>
      </h3>
      <p>
        <span>By </span>
        <Link
          className="text-blue-500 underline"
          to={`/users/${article.author}`}
        >
          {article.author}
        </Link>
      </p>
      <p className="text-sm text-gray-500">{formatDate(article.created_at)}</p>
      <img src={article.article_img_url} alt="" className="my-2 rounded-xl" />
      <div className="flex flex-row gap-4 self-end text-sm text-gray-500">
        <div>{article.votes} votes</div>
        <div>{article.comment_count} comments</div>
      </div>
    </li>
  );
}
