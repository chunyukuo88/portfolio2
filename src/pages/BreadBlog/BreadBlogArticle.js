import { selectCurrentUser, selectCurrentToken } from 'src/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Pencil } from 'src/components/Pencil/Pencil';
import './BreadBlogArticle.css';


export function BreadBlogArticle({ article }) {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const TitleWithoutButtons = () => <p>{article.title}</p>;

  const asDateString = new Date(article.creationTimeStamp)
    .toISOString()
    .slice(0,10);

  const isAuthorized = user && token;
  const editable = ['title', 'image', 'body'];

  const Heading = () => (
    <>
      {isAuthorized ? <Pencil article={article} token={token} aspect={editable[0]}/> : null}
      <TitleWithoutButtons article={article} />
      <h5 className='publication-date'>{asDateString}</h5>
    </>
  );

  const Image = () => (
    <>
      {isAuthorized ? <Pencil article={article} token={token} aspect={editable[1]}/> : null}
      <img
        loading='lazy'
        className='blog-image'
        src={article.imageUrl}
        aria-label={`Image for blog titled ${article.title}`}
      />
    </>
  );

  const Body = () => (
    <div className='blog-body-container'>
      {isAuthorized ? <Pencil article={article} token={token} aspect={editable[2]}/> : null}
      <span>{article.body}</span>
    </div>
  );

  return (
    <>
      <Heading />
      <Image />
      <Body />
    </>
  );
}