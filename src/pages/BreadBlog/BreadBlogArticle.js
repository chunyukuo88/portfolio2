export function BreadBlogArticle({ article }) {

  const TitleWithoutButtons = () => <div className='blog-title-without-buttons'>{article.title}</div>;

  const asDateString = () => new Date(article.created_at).toISOString().slice(0,10);

  const Heading = () => (
    <>
      <TitleWithoutButtons article={article} />
      <h5 className='publication-date'>{asDateString(article)}</h5>
    </>
  );

  const Image = () => (
    <>
      <img
        className='blog-image'
        src={article.imageUrl}
        aria-label={`Image for blog titled ${article.title}`}
      />
    </>
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