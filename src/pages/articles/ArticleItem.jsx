import { Link } from "react-router-dom";
import formatDate from "../../utilities/formatDate";

export default function ArticleItem({ article }) {
  return (
    <li className="max-w-[500px] rounded border border-gray-300 shadow md:max-w-[400px]">
      <Image src={article.article_img_url} topic={article.topic} />
      <div className="flex flex-col gap-2 p-4">
        <Topic topic={article.topic} />
        <Heading title={article.title} article_id={article.article_id} />
        <Author author={article.author} />
        <Date date={article.created_at} />
        <CountsContainer>
          <Count label="votes">{article.votes}</Count>
          <Count label="comments">{article.comments}</Count>
        </CountsContainer>
      </div>
    </li>
  );
}

function Topic({ topic }) {
  return <p className="font-bold text-gray-500">#{topic}</p>;
}

function Heading({ title, article_id }) {
  return (
    <h3 className="font-black">
      <Link className="underline" to={`/articles/${article_id}`}>
        {title}
      </Link>
    </h3>
  );
}

function Author({ author }) {
  return (
    <p>
      <span>By </span>
      <Link className="text-blue-500 underline" to={`/users/${author}`}>
        {author}
      </Link>
    </p>
  );
}

function Date({ date }) {
  return <p className="text-sm text-gray-500">{formatDate(date)}</p>;
}

function Image({ src, topic }) {
  return (
    <img src={src} alt={`relating to ${topic}`} className="mb-2 rounded-t" />
  );
}

function CountsContainer({ children }) {
  return (
    <div className="mt-2 flex flex-row gap-4 self-end text-sm text-gray-500">
      {children}
    </div>
  );
}

function Count({ children, label }) {
  return (
    <p>
      {children} {label}
    </p>
  );
}
