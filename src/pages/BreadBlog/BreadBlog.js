/**
 *
 * Deprecated -- Kept in October 2023 for reference purposes.
 *
 * */

import { useQuery } from '@tanstack/react-query';
import { useCommonGlobals } from '../../common/hooks';

import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

import { getBlogs } from '../../common/utils';
import { routes } from '../../routes';
import strings, { queryKeys } from '../../common/strings';
import './BreadBlog.css';
import {InfiniteArticles} from "./InfiniteArticles";

export function BreadBlog() {
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

  return (queryResult.isLoading)
    ? <LoadingSpinner />
    : (
      <article role='main' id='bread-blog'>
        <section>
          <InfiniteArticles />
        </section>
      </article>
    );
}
