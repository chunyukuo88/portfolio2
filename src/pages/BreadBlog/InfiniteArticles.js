import { useInfiniteQuery } from '@tanstack/react-query';
import { useCommonGlobals } from 'src/common/hooks';

import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import InfiniteScroll from 'react-infinite-scroller';
import strings from 'src/common/strings';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;


export function InfiniteArticles() {
  const [ language ] = useCommonGlobals();

  const fetchUrl = async ({pageParam = null}) => {
    console.log('pageParam', pageParam); // TODO: This stays `null` at all times. It is not receiving the new pageParam value.
    const url = pageParam ? `${initialUrl}${pageParam}` : initialUrl
    const response = await fetch(url);
    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ['blog-articles'],
    queryFn: ({pageParam = initialUrl}) => {
      return fetchUrl(pageParam);
    },
    getNextPageParam: (lastPage) => {
      const page = JSON.parse(lastPage.body);
      const previousPageParam = page.previous || undefined;
      return previousPageParam;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const ErrorMessage = (message) => (
    <div id='error-fetching-blog-posts'>
      <p id='blogs-unavailable'>
        {message || strings.blogDownForMaintenance[language]}
      </p>
    </div>
  );

  if (isError) {
    return <ErrorMessage />;
  }

  if (isSuccess) {
    try {
      return (
        <div id='infinite-scroll-articles-wrapper'>
          {isFetching ? <LoadingSpinner /> : null}
          <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {data.pages.map((pageData) => {
                return JSON.parse(pageData.body).results.map(article => {
                  return <BreadBlogArticle article={article} key={article.creationTimeStamp} />
                })
              }
            )}
          </InfiniteScroll>
        </div>
      );
    } catch (error) {
      return <ErrorMessage message={'Blogs fetched successfully but there was an error processing them.'}/>;
    }
  }
}
