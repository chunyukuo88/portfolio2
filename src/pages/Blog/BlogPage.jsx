import { Link } from 'react-router-dom';
import strings from 'src/common/strings';
import { LinkStyling } from 'src/common/globalStyles';
import { routes } from 'src/routes';
import { useCommonGlobals } from 'src/common/hooks';
import { getBlogs } from 'src/common/utils';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import './BlogPage.css';

import { queryKeys } from 'src/common/strings';
import { useQuery } from '@tanstack/react-query';

export function BlogPage(){
  const { isLoading, isError, data, error } = useQuery([queryKeys.BLOGS], getBlogs);
  const [ language ] = useCommonGlobals(routes.blog);

  const sortNewestToOldest = (blogData) => blogData.sort((a, b) => a.creationTimeStamp > b.creationTimeStamp ? -1 : 1);
  const sorted = sortNewestToOldest(data);
  const asDateString = (article) => new Date(article.creationTimeStamp).toISOString().slice(0,10);
  const ErrorMessage = () => {
    console.error(error);
    return (
      <div>
        Blogs are undergoing maintenance at this time. Perhaps try the crossword while you wait.
      </div>
    );
  };

  if (isLoading) return <LoadingSpinner language={language} />;
  if (isError) return <ErrorMessage />;

  const BlogContent = () => (
    <>
      {sorted.map((article, key) => (
        <article className='article' key={key}>
          <header className='blog-title'>{article.title}</header>
          <h2 className='publication-date'>{asDateString(article)}</h2>
          <img
            className='blog-image'
            src={article.imageUrl}
            aria-label={`Image for blog titled ${article.title}`}
            loading={key === 0 ? 'eager' : 'lazy'}
          />
          <p className='blog-body'>{article.theme}</p>
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
      <section>{isError ? <ErrorMessage /> : <BlogContent />}</section>
    </main>
  );
}