import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BreadBlogArticle } from './BreadBlogArticle';
import strings from "../../common/strings";
import {useCommonGlobals} from "../../common/hooks";
import {routes} from "../../routes";

const initialUrl = `${process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE}/1`
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteArticles(){
  const [ language ] = useCommonGlobals(routes.blog);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isLoading,
    isError,
    error
  } = useInfiniteQuery(
    ['blog-articles'],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return (
    <>
      Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading...
    </>
  );

  const ErrorMessage = () => <div id='error-fetching-blog-posts'>{strings.blogDownForMaintenance[language]}</div>;
  if (isError) {
    console.info('the error, sir: ', error.toString());
    return <ErrorMessage />;
  }

  const sortNewestToOldest = (body) => body.sort((a, b) => new Date(a.creationTimeStamp) > new Date(b.creationTimeStamp) ? -1 : 1);

  const Content = (sorted) => (
    <>
      {sorted.pages.map(pageData => {
        console.log('pageData: ');
        console.dir(pageData);
        return pageData.results.map(article => {
          return <BreadBlogArticle article={article} />
        })
      })}
    </>
  );

  if (isSuccess) {
    try {
      const pageAsArray = JSON.parse(data.pages[0].body)[0].results;
      const sorted = sortNewestToOldest(pageAsArray);

      return (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          {sorted.map(article => {
            console.dir(article);
            return <BreadBlogArticle article={article} />
          })}
        </InfiniteScroll>
      );
    } catch (error) {
      console.error('Error parsing blog post data:', error);
      return (
        <>
          {error.toString()}
        </>
      )
    }
  }
}
