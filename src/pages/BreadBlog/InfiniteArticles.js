import { useRef, useEffect } from 'react';
import {QueryClientProvider, useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import { useCommonGlobals } from 'src/common/hooks';

import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import InfiniteScroll from 'react-infinite-scroller';
import strings from 'src/common/strings';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

const fetchUrl = async ({ pageParam = null }) => {
  const url = pageParam ? `${initialUrl}${pageParam}` : initialUrl
  const response = await fetch(url);
  return response.json();
};

export function InfiniteArticles() {
  const [ language ] = useCommonGlobals();
  const queryClient = useQueryClient();
  const ref = useRef(null);

  const {data, fetchNextPage, isFetchingNextPage, isSuccess} = useInfiniteQuery(
    ['blog-articles'],
    async ({pageParam = 1}) => await fetchUrl(pageParam),
    {
      getNextPageParam: (_, pages) => pages.length + 1
    }
  );

  useEffect(()=> {
    const observer = new IntersectionObserver(
      (entries) => {entries.forEach(entry => fetchNextPage())
    });
    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [ref]);

  if (data) {
    console.log(data);
  }

  if (isSuccess) {
    return (
      <QueryClientProvider client={queryClient}>
        <div id='infinite-scroll-articles-wrapper'>
          {data.pages.map((pageData) => {
              return JSON.parse(pageData.body).results.map(article => {
                return <BreadBlogArticle article={article} key={article.creationTimeStamp} />
              })
            }
          )}
        </div>
        <span ref={ref}></span>
      </QueryClientProvider>
    );
  }
}
