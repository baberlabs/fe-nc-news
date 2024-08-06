import { useParams } from "react-router-dom";

import Comments from "./Comments";

import {
  Topic,
  Heading,
  Author,
  Date,
  Image,
  Body,
  CountsContainer,
  Count,
  ButtonsContainer,
  Button,
  ArticleLoadingText,
} from "./Components";

import useArticle from "./useArticle";
import useVotes from "./useVotes";

export default function Article() {
  const { article_id } = useParams();

  const { isLoading, article } = useArticle(article_id);
  const { currentVotes, setCurrentVotes } = useVotes(article.votes);

  return (
    <section className="p-4 md:p-8">
      {isLoading && <ArticleLoadingText />}
      {!isLoading && (
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
            <Button
              color="green"
              inc_votes={1}
              votes={currentVotes}
              setCurrentVotes={setCurrentVotes}
            >
              Upvote
            </Button>
            <Button
              color="red"
              inc_votes={-1}
              votes={currentVotes}
              setCurrentVotes={setCurrentVotes}
            >
              Downvote
            </Button>
            <Button color="gray">Comments</Button>
          </ButtonsContainer>
          <Comments />
        </div>
      )}
    </section>
  );
}
