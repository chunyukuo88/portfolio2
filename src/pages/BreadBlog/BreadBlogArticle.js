import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  selectCurrentUser,
  selectCurrentToken,
  selectCurrentLanguage,
} from 'src/globalState';

import { Pencil } from 'src/components/Pencil/Pencil';

import strings from 'src/common/strings';
import './BreadBlogArticle.css';
import {LoadingSpinner} from "../../components";

export function BreadBlogArticle({ article }) {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const language = useSelector(selectCurrentLanguage);

  const TitleWithButtons = () => (
    <div className='title-with-buttons'>
      <div>
        <Pencil article={article} token={token} aspect={editable[0]}/>
      </div>
      <p>{article.title}</p>
    </div>
  );

  const TitleWithoutButtons = () => <p>{article.title}</p>;

  const asDateString = () => {
    return article.creationTimeStamp
      ? new Date(article.creationTimeStamp)
        .toISOString()
        .slice(0,10)
      : strings.forgotWhenIWroteThis[language]
  };

  const isAuthorized = user && token;
  const editable = ['title', 'imageUrl', 'body'];

  const Heading = () => (
    <>
      <div className='blog-article-title'>
        {isAuthorized
          ? <TitleWithButtons />
          : <TitleWithoutButtons />
        }
      </div>
      <h5 className='publication-date'>{asDateString()}</h5>
    </>
  );

  const disableLoadingSpinner = () => setIsLoading(false);

  const Image = () => (
    <div className='blog-article-image'>
      {isLoading ? < LoadingSpinner /> : null}
      <div>
        {isAuthorized ? <Pencil article={article} token={token} aspect={editable[1]}/> : null}
      </div>
      <img
        loading='lazy'
        className='blog-image'
        src={article.imageUrl}
        alt={`Image for blog titled ${article.title}`}
        aria-label={`Image for blog titled ${article.title}`}
        onLoad={disableLoadingSpinner}
      />
    </div>
  );

  const Body = () => (
    <div className='blog-body-container'>
      {isAuthorized ? <Pencil article={article} token={token} aspect={editable[2]}/> : null}
      <span>{article.body}</span>
    </div>
  );

  return (
    <div className='bread-blog-article'>
      <Heading />
      <Image />
      <Body />
    </div>
  );
}