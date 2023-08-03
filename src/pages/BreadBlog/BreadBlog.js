import { useIntersection } from 'react-use'; // TODO: check this out
import { useQuery } from '@tanstack/react-query';
import { useCommonGlobals } from '../../common/hooks';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

import { Pencil } from '../../components/Pencil/Pencil';
import { TrashCan } from '../../components/TrashCan/TrashCan';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

import { getBlogs } from '../../common/utils';
import { routes } from '../../routes';
import strings, { queryKeys } from '../../common/strings';
import './BreadBlog.css';

export function BreadBlog() {
  const token = useSelector(selectCurrentToken);
  const [ language ] = useCommonGlobals(routes.blog);
  const queryResult = useQuery({
    queryKey: [queryKeys.BLOGS],
    queryFn: getBlogs,
  });

  const ErrorMessage = () => <div id='error-fetching-blog-posts'>{strings.blogDownForMaintenance[language]}</div>;
  if (queryResult.isError) return <ErrorMessage />;

  const sortNewestToOldest = (body) => body.sort((a, b) => new Date(a.creationTimeStamp) > new Date(b.creationTimeStamp) ? -1 : 1);

  let sorted = [];
  if (queryResult.isSuccess) {
    try {
      const pageAsArray = JSON.parse(queryResult.data.body)[0];
      const arrayOfArticles = pageAsArray.results;
      sorted = sortNewestToOldest(arrayOfArticles);
    } catch (error) {
      console.error('Error parsing blog post data:', error);
    }
  }

  const EDITABLE = {
    TITLE: 'title',
    IMG_URL: 'imageUrl',
    BODY: 'theme',
  };

  const TitleWithButtons = ({ article }) => (
    <div className='blog-title-with-buttons'>
      <Pencil token={token} article={article} aspect={EDITABLE.TITLE}/>
      <div>{article.title}</div>
      <TrashCan token={token} article={article} />
    </div>
  );

  const TitleWithoutButtons = ({ article }) => <div className='blog-title-without-buttons'>{article.title}</div>;

  const asDateString = (article) => new Date(article.creationTimeStamp).toISOString().slice(0,10);

  const Heading = ({ article }) => (
    <>
      {token ? <TitleWithButtons article={article} /> : <TitleWithoutButtons article={article} />}
      <h5 className='publication-date'>{asDateString(article)}</h5>
    </>
  );

  const Image = ({ article }) => (
    <>
      <span className='img-pencil-adjuster'>
        {token && <Pencil token={token} article={article} aspect={EDITABLE.IMG_URL}/>}
      </span>
      <img
        className='blog-image'
        src={article.imageUrl}
        aria-label={`Image for blog titled ${article.title}`}
      />
    </>
  );

  const Body = ({ article }) => (
    <div className='blog-body-container'>
      <div className='blog-body'>
        <span className='img-pencil-adjuster'>
          {token ? <Pencil token={token} article={article} aspect={EDITABLE.BODY}/> : null}
        </span>
        <span>{article.body}</span>
      </div>
    </div>
  );

  const BlogContent = () => (
    <>
      {sorted.map((article, key) => (
        <article className='blog-post' key={key}>
          <Heading article={article}/>
          <Image article={article} key={key} />
          <Body article={article} />
        </article>
      ))}
    </>
  );

  return (queryResult.isLoading)
    ? <LoadingSpinner />
    : (
      <article role='main' id='bread-blog'>
        <section>
          {
            queryResult.isError
              ? <ErrorMessage />
              : <BlogContent />
          }
        </section>
      </article>
    );
}
