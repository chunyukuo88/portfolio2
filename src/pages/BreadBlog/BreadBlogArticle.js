import './BreadBlogArticle.css';

export function BreadBlogArticle({ article }) {

  const TitleWithoutButtons = () => <p>{article.title}</p>;

  const asDateString = new Date(article.creationTimeStamp)
    .toISOString()
    .slice(0,10);

  const Heading = () => (
    <>
      <TitleWithoutButtons article={article} />
      <h5 className='publication-date'>{asDateString}</h5>
    </>
  );

  const Image = () => (
    <img
      loading='lazy'
      className='blog-image'
      src={article.imageUrl}
      aria-label={`Image for blog titled ${article.title}`}
    />
  );

  const Body = () => (
    <div className='blog-body-container'>
      <div className='blog-body'>
        <span>{article.body}</span>
      </div>
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