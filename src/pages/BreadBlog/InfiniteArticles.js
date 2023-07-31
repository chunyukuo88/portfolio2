import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import {BreadBlogArticle} from "./BreadBlogArticle";

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteArticles(){
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'blog-articles',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
    {data.pages.map(pageData => {
      pageData.result.map(article => <BreadBlogArticle article={article} />)
    })}
  </InfiniteScroll>;
}
