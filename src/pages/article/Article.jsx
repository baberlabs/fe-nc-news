import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Comments from "./Comments";

import {
  ArticleError,
  Topic,
  Heading,
  Author,
  Date,
  Image,
  Body,
  CountsContainer,
  Count,
  VotesErrorText,
  VotesNotLoggedInErrorText,
  ButtonsContainer,
  ArticleLoadingText,
  LikeButton,
  DislikeButton,
} from "./Components";

import useArticle from "./useArticle";
import useVotes from "./useVotes";
import { useArticles } from "../articles/useArticles";
import useNextArticle from "./useNextArticle";

export default function Article() {
  const { article_id } = useParams();
  const { isLoading, article, articleError } = useArticle(article_id);
  const { currentVotes, setCurrentVotes } = useVotes(article.votes);

  const [votesError, setVotesError] = useState(false);
  const [votesNotLoggedInError, setVotesNotLoggedInError] = useState(false);

  const hasArticleError = !isLoading && articleError.status;
  const hasNoArticleError = !isLoading && !articleError.status;

  const { articles } = useArticles(1);
  const { nextArticle } = useNextArticle(article_id, articles);

  return (
    <section className="flex flex-col gap-4 p-4 md:p-8">
      <Link
        className="flex flex-col self-end rounded bg-gray-300 px-4 py-2 text-black hover:bg-black hover:text-white"
        to={`/articles/${nextArticle?.article_id}`}
      >
        <span className="w-28 font-bold">Read Next:</span>
        <span className="w-full">
          {nextArticle?.title ? nextArticle.title : "Loading..."}
        </span>
      </Link>

      {isLoading && <ArticleLoadingText />}
      {hasArticleError && <ArticleError error={articleError} />}
      {hasNoArticleError && (
        <div className="mx-auto flex max-w-[700px] flex-col gap-4">
          <Topic topic={article.topic} />
          <Heading title={article.title} />
          <Author author={article.author} />
          <Date date={article.created_at} />
          <Image src={article.article_img_url} topic={article.topic} />
          <Body body={article.body} />
          <CountsContainer>
            <Count label="votes">
              {currentVotes ? currentVotes : article.votes}
            </Count>
            <Count label="comments">{article.comment_count}</Count>
          </CountsContainer>
          <ButtonsContainer self="start">
            <LikeButton
              setCurrentVotes={setCurrentVotes}
              setVotesError={setVotesError}
              setVotesNotLoggedInError={setVotesNotLoggedInError}
            />
            <DislikeButton
              setCurrentVotes={setCurrentVotes}
              setVotesError={setVotesError}
              setVotesNotLoggedInError={setVotesNotLoggedInError}
            />
          </ButtonsContainer>
          {votesError && <VotesErrorText />}
          {votesNotLoggedInError && <VotesNotLoggedInErrorText />}
          <Comments />
        </div>
      )}
    </section>
  );
}
