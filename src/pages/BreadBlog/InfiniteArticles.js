import { useState, useEffect, useRef } from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

export function InfiniteArticles() {
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(null);

  const lastArticleRef = useRef(null);

  const handleScroll = () => {
    if (lastArticleRef?.current?.body) {
      const lastArticle = document.getElementById(`${lastArticleRef.current.body}`);
      const topOfLastArticle = lastArticle?.getBoundingClientRect().top;
      if (topOfLastArticle < 100) {
        const decrementedPage = lastArticleRef.current.page - 1;
        if (decrementedPage > 0) {
          setPage(decrementedPage);
        }
      }
    }
  };

  useEffect(() => {
    const pageNumber = page || 4;
    setPage(pageNumber);
    fetch(`${initialUrl}${pageNumber}`).then(
      async response => {
        const newPosts = await response.json();
        const parsedNewPosts = JSON.parse(newPosts.body)[0].results;
        if (parsedNewPosts) {
          setPosts([...posts, ...parsedNewPosts]);
          lastArticleRef.current = parsedNewPosts[parsedNewPosts.length - 1];
        }
      }
    );
  }, [page]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return posts.length > 0 ? (
    <>
      <div id='infinite-scroll-articles-wrapper'>
        {posts.map((article, key) => {
          return (
            <div id={`${article.body}`} key={key}>
              <BreadBlogArticle article={article} />
            </div>
          );
        })}
      </div>
    </>
  ) : <LoadingSpinner />;
}
