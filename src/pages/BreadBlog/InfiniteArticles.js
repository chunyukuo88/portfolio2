import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

export function InfiniteArticles() {
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(null);

  const lastArticleRef = useRef(null);

  const handleScroll = (event) => {
    if (lastArticleRef?.current?.body) {
      console.log(lastArticleRef.current.body);
      const lastArticle = document.getElementById(`${lastArticleRef.current.body}`);
      const topOflastArticle = lastArticle.getBoundingClientRect().top;
      if (topOflastArticle < 0 && Math.abs(topOflastArticle) >= window.innerHeight) {
        console.log('moist!');
        setPage(1);
      }

    }
  };


  useEffect(() => {
    console.log('useEffect() - page: ', page);
    const pageNumber = page || 2;
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
            <div id={`${article.body}`}>
              <BreadBlogArticle article={article} key={key} />
            </div>
          )
        })}
      </div>
    </>
  ) : <LoadingSpinner />;
}
