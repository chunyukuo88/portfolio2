import { useInfiniteQuery } from '@tanstack/react-query';
import { useCommonGlobals } from 'src/common/hooks';

import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import InfiniteScroll from 'react-infinite-scroller';
import strings from 'src/common/strings';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteArticles() {
  const [ language ] = useCommonGlobals();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isLoading,
    isError,
  } = useInfiniteQuery(
    ['blog-articles'],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  const ErrorMessage = () => (
    <div id='error-fetching-blog-posts'>
      <p id='blogs-unavailable'>
        {strings.blogDownForMaintenance[language]}
      </p>
    </div>
  );

  if (isError) {
    return <ErrorMessage />;
  }

  const sortNewestToOldest = (body) => body.sort((a, b) => {
    return new Date(a.creationTimeStamp) > new Date(b.creationTimeStamp) ? -1 : 1;
  });

  if (isSuccess) {
    try {
      const pageAsArray = JSON.parse(data.pages[0].body).results;
      const sorted = sortNewestToOldest(pageAsArray);

      return (
        <div id='infinite-scroll-articles-wrapper'>
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {sorted.map(article => {
              console.dir(article);
              return <BreadBlogArticle article={article} />
            })}
        </InfiniteScroll>
        </div>
      );
    } catch (error) {
      return <ErrorMessage />;
    }
  }
}
