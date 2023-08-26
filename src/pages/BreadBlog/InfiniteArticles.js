import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import './InfiniteArticles.css';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

export function InfiniteArticles() {
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(null);
  const [distanceDown, setDistanceDown] = useState(0);
  const lastArticleRef = useRef(null);

  const handleScroll = (event) => {
    setDistanceDown(distanceDown => distanceDown + event.deltaY);
    const userIsNearBottomOfPage = (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100);
    if (userIsNearBottomOfPage) {
      setPage(1);
    }
  };

  useEffect(() => {
    const pageNumber = page || 2;
    fetch(`${initialUrl}${pageNumber}`).then(
      async response => {
        const newPosts = await response.json();
        const parsedNewPosts = JSON.parse(newPosts.body)[0].results;
        if (parsedNewPosts) {
          setPosts([...posts, ...parsedNewPosts]);
          lastArticleRef.current = parsedNewPosts[parsedNewPosts.length - 1];
          console.log(lastArticleRef);
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
          return <BreadBlogArticle article={article} key={key} />
        })}
      </div>
    </>
  ) : <LoadingSpinner />;
}
