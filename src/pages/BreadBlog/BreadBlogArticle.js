import { selectCurrentUser, selectCurrentToken } from 'src/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Pencil } from 'src/components/Pencil/Pencil';
import './BreadBlogArticle.css';


export function BreadBlogArticle({ article }) {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const TitleWithButtons = () => (
    <div className='title-with-buttons'>
      <div>
        <Pencil article={article} token={token} aspect={editable[0]}/>
      </div>
      <p>{article.title}</p>
    </div>
  );

  const TitleWithoutButtons = () => (
    <p>
      {article.title}
    </p>
  );

  const asDateString = new Date(article.creationTimeStamp)
    .toISOString()
    .slice(0,10);

  const isAuthorized = user && token;
  const editable = ['title', 'image url', 'body'];

  const Heading = () => (
    <>
      <div className='blog-article-title'>
        {isAuthorized
          ? <TitleWithButtons />
          : <TitleWithoutButtons />
        }
      </div>
      <h5 className='publication-date'>{asDateString}</h5>
    </>
  );

  const Image = () => (
    <div className='blog-article-image'>
      <div>
        {isAuthorized ? <Pencil article={article} token={token} aspect={editable[1]}/> : null}
      </div>
      <img
        loading='lazy'
        className='blog-image'
        src={article.imageUrl}
        aria-label={`Image for blog titled ${article.title}`}
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