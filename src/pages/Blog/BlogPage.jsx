import { useCommonGlobals } from 'src/common/hooks';
import {useMutation, useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { LinkStyling } from 'src/common/globalStyles';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';

import { createHttpRequest, deleteBlog, getBlogs } from 'src/common/utils';
import { selectCurrentToken } from 'src/features/auth/authSlice';
import strings, { queryKeys } from 'src/common/strings';
import { routes } from 'src/routes';

import './BlogPage.css';

export function BlogPage(){
  const [failedToDelete, setFailedToDelete] = useState(null);
  const queryResult = useQuery({
    queryKey: [queryKeys.BLOGS],
    queryFn: getBlogs,
  });
  const deletion = useMutation({
    queryKey: [queryKeys.BLOG_DELETION],
    queryFn: deleteBlog,
  });
  const token = useSelector(selectCurrentToken);
  const [ language ] = useCommonGlobals(routes.blog);

  const asDateString = (article) => new Date(article.creationTimeStamp).toISOString().slice(0,10);
  const ErrorMessage = () => {
    return (
      <div id='error-fetching-blog-posts'>
        Blogs are undergoing maintenance at this time. Perhaps try the crossword while you wait.
      </div>
    );
  };

  if (queryResult.isLoading) return <LoadingSpinner language={language} />;
  if (queryResult.isError) return <ErrorMessage />;

  const sortNewestToOldest = (blogData) => blogData.sort((a, b) => a.creationTimeStamp > b.creationTimeStamp ? -1 : 1);
  const sorted = sortNewestToOldest(queryResult.data);

  const deleteHandler = async (article) => {
    const requestData = createHttpRequest('DELETE', token, null);
    try {
      await deleteBlog(article.entityId, requestData);
    } catch (e) {
      setFailedToDelete(article.title);
    }
  };

  const FailureToDelete = (article) => article.title === failedToDelete
    ? <span>Failed to delete `${article.title}`</span>
    : null;

  const BlogContent = () => (
    <>
      {sorted.map((article, key) => (
        <article className='article' key={key}>
          <header className='blog-title'>{article.title}</header>
          <FailureToDelete article={article} />
          {token && <div className='trashcan' onClick={() => deleteHandler(article)}>🗑</div>}
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
      <section>{queryResult.isError ? <ErrorMessage /> : <BlogContent />}</section>
    </main>
  );
}