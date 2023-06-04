import { useCommonGlobals } from 'src/common/hooks';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { LinkStyling } from 'src/common/globalStyles';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';

import { getBlogs } from 'src/common/utils';
import { selectCurrentToken } from 'src/features/auth/authSlice';
import strings, { queryKeys } from 'src/common/strings';
import { routes } from 'src/routes';

import { TrashCan } from 'src/components/TrashCan/TrashCan';
import { Pencil } from "src/components/Pencil/Pencil";
import './BlogPage.css';

export function BlogPage(){
  const token = useSelector(selectCurrentToken);
  const [ language ] = useCommonGlobals(routes.blog);
  const queryResult = useQuery({
    queryKey: [queryKeys.BLOGS],
    queryFn: getBlogs,
  });

  const asDateString = (article) => new Date(article.creationTimeStamp).toISOString().slice(0,10);
  const ErrorMessage = () => {
    return (
      <div id='error-fetching-blog-posts'>
        Blogs are undergoing maintenance at this time. Perhaps try the crossword while you wait.
      </div>
    );
  };

  if (queryResult.isLoading) return <LoadingSpinner />;
  if (queryResult.isError) return <ErrorMessage />;

  const sortNewestToOldest = (blogData) => blogData.sort((a, b) => a.creationTimeStamp > b.creationTimeStamp ? -1 : 1);
  const sorted = sortNewestToOldest(queryResult.data);

  console.log('sorted: ', sorted);

  const BlogContent = () => (
    <>
      {sorted.map((article, key) => (
        <article className='article' key={key}>
          <div className='blog-title-container'>
            {token && <Pencil/>}
            <header className='blog-title'>{article.title}</header>
            {token && <TrashCan token={token} article={article} />}
          </div>
          <h2 className='publication-date'>{asDateString(article)}</h2>
          <img
            className='blog-image'
            src={article.imageUrl}
            aria-label={`Image for blog titled ${article.title}`}
            loading={key === 0 ? 'eager' : 'lazy'}
          />
          <div className='blog-body-container'>
            <p className='blog-body'>{article.theme}</p>
          </div>
        </article>
      ))}
    </>
  );

  return (
    <main role='main' className='blog-page-content'>
      <nav className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </nav>
      <section>{queryResult.isError ? <ErrorMessage /> : <BlogContent />}</section>
    </main>
  );
}