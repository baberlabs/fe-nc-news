import { useParams } from "react-router-dom";
import { useState } from "react";

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

export default function Article() {
  const { article_id } = useParams();
  const { isLoading, article, articleError } = useArticle(article_id);
  const { currentVotes, setCurrentVotes } = useVotes(article.votes);

  const [votesError, setVotesError] = useState(false);
  const [votesNotLoggedInError, setVotesNotLoggedInError] = useState(false);

  const hasArticleError = !isLoading && articleError.status;
  const hasNoArticleError = !isLoading && !articleError.status;

  return (
    <section className="p-4 md:p-8">
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
