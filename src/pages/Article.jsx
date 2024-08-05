import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../utilities/api";
import formatDate from "../utilities/formatDate";

export default function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  function Topic() {
    return <p className="font-bold text-gray-500">#{article.topic}</p>;
  }

  function Heading() {
    return <h2 className="text-2xl font-black">{article.title}</h2>;
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
        className="my-2"
        src={article.article_img_url}
        alt={`relating to ${article.topic}`}
      />
    );
  }

  function Body() {
    return <p>{article.body}</p>;
  }

  function VotesAndCommentsCount() {
    return (
      <div className="flex flex-row gap-4 text-sm text-gray-500">
        <p>{article.votes} votes</p>
        <p>{article.comment_count} comments</p>
      </div>
    );
  }

  function VotesAndCommentsButton() {
    return (
      <div className="flex flex-row gap-4">
        <button className="rounded-xl bg-green-700 px-4 py-2 text-sm font-bold text-white">
          Upvote
        </button>
        <button className="rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white">
          Downvote
        </button>
        <button className="rounded-xl bg-gray-700 px-4 py-2 text-sm font-bold text-white">
          Comment
        </button>
      </div>
    );
  }

  return (
    <section className="p-4 md:p-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-auto flex max-w-[700px] flex-col gap-4">
          <Topic />
          <Heading />
          <Author />
          <Date />
          <Image />
          <Body />
          <VotesAndCommentsCount />
          <VotesAndCommentsButton />
        </div>
      )}
    </section>
  );
}
