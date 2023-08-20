import {QueryClientProvider, useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import InfiniteScroll from 'react-infinite-scroller';
import strings from 'src/common/strings';


import { useState, useEffect } from 'react';
import { useCommonGlobals } from 'src/common/hooks';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

export function InfiniteArticles() {
  const [ language ] = useCommonGlobals();
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(null);

  const handleScroll = () => {
    console.log('handleScroll()');
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      && posts.length > 0
    ) {
      console.log('sth');
      // setPage(previousPage => previousPage + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const pageNumber = page || 1;
    fetch(`${initialUrl}${pageNumber}`).then(
      async response => {
        const newPosts = await response.json()
        const parsedNewPosts = JSON.parse(newPosts.body)[0].results;
        setPosts([...posts, ...parsedNewPosts]);
      }
    );
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  return posts.length ? (
    <>
      <div id='infinite-scroll-articles-wrapper'>
        {posts.map((article) => {
          return <BreadBlogArticle article={article} key={article.creationTimeStamp} />
        })}
      </div>
    </>
  ) : <LoadingSpinner />;
}
