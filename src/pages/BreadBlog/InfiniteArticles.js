import { useState, useEffect, useRef } from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import './InfiniteArticles.css';
import { environments } from 'src/common/strings';

export function InfiniteArticles() {
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(null);
  const lastArticleRef = useRef(null);

  const handleScroll = () => {
    if (lastArticleRef?.current?.articleId) {
      const lastArticle = document.getElementById(`${lastArticleRef.current.articleId}`);
      const topOfLastArticle = lastArticle?.getBoundingClientRect().top;
      const decrementedPage = lastArticleRef.current.page - 1;
      if (topOfLastArticle < 100 && decrementedPage > 0) {
        setPage(decrementedPage);
      }
    }
  };

  const endpoint = (process.env.NODE_ENV === environments.PROD)
    ? process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE_PROD
    : process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

  const getInfiniteBlogsUrl = (page) => page
    ? `${endpoint}${page}`
    : endpoint;

  const getParsedNewPosts = (page, newPosts) => page
    ? JSON.parse(newPosts.body)[0].results
    : JSON.parse(newPosts.body).results;

  useEffect(() => {
    const url = getInfiniteBlogsUrl(page)
    fetch(url).then(
      async response => {
        const newPosts = await response.json();
        const parsedNewPosts = getParsedNewPosts(page, newPosts);
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
    <div id='infinite-scroll-articles-wrapper'>
      {posts.map((article, key) => {
        return (
          <div id={`${article.articleId}`} className='individual-article' key={key}>
            <BreadBlogArticle article={article} />
          </div>
        );
      })}
    </div>
  ) : <LoadingSpinner />;
}
