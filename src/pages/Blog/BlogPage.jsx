import { useCommonGlobals } from 'src/common/hooks';
import {useMutation, useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { LinkStyling } from 'src/common/globalStyles';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';

import { createHttpRequest, deleteBlog, getBlogs } from 'src/common/utils';
import { selectCurrentToken } from 'src/features/auth/authSlice';
import strings, { queryKeys } from 'src/common/strings';
import { routes } from 'src/routes';

import './BlogPage.css';

export function BlogPage(){
  const token = useSelector(selectCurrentToken);
  const [ language ] = useCommonGlobals(routes.blog);
  const queryResult = useQuery({
    queryKey: [queryKeys.BLOGS],
    queryFn: getBlogs,
  });

  const deletion = useMutation({
    mutationFn: async (entityId, options) => deleteBlog(entityId, options),
  });

  const deletionHandler = async (event, article) => {
    event.preventDefault();
    const requestData = createHttpRequest('DELETE', token, null);
    await deleteBlog(article.entityId, requestData);
  };

  const getModal = () => document.querySelector('.deletion-modal');

  const openDeletionDialog = async (event, article) => {
    const modal = getModal();
    modal.showModal();
  };

  const confirmationHandler = (event) => {
    const modal = getModal();
    modal.close();
    // await deletionHandler(event, article);
  };

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

  const BlogContent = () => (
    <>
      <dialog className='deletion-modal'>
        <p>Are you sure you want to delete this article?</p>
        <button onClick={confirmationHandler}>Yeah</button>
        <button onClick={confirmationHandler}>Nah</button>
      </dialog>
      {sorted.map((article, key) => (
        <article className='article' key={key}>
          <header className='blog-title'>{article.title}</header>
          {deletion.isError? <span>Failed to delete `${article.title}`</span> : null}
          {token && <span className='trashcan' onClick={(e) => openDeletionDialog(e, article)}>🗑</span>}
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