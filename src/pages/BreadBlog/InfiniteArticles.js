import {useState, useEffect, useLayoutEffect} from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { BreadBlogArticle } from './BreadBlogArticle';
import './InfiniteArticles.css';
import useDocumentHeight from "../../common/hooks";

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE;

export function InfiniteArticles() {
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(null);
  const [distanceDown, setDistanceDown] = useState(0);

  const handleScroll = (event) => {
    setDistanceDown(distanceDown => distanceDown + event.deltaY);
    const userIsNearBottomOfPage = (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100);
    if (userIsNearBottomOfPage) {
      setPage(1);
    }
  };

  /**
   * This works! It only ever increments. Try basing the re-fetches off of
   * when the distance traveled downward exceeds some multiple of the height of the
   * viewport of the user's device.
   * Also think about accounting for how to define when the user has reached the bottom
   * of the document. JavaScript doesn't seem to have any native methods for this,
   * so consider useState(false) that gets set to `true` when the user reaches the bottom.
   * This would only need to happen once, i.e. when there is no more blog content.
   * */
  useLayoutEffect(() => {
    console.log('distanceDown: ', distanceDown);
  }, [distanceDown]);

  useEffect(() => {
    const pageNumber = page || 2;
    fetch(`${initialUrl}${pageNumber}`).then(
      async response => {
        const newPosts = await response.json();
        const parsedNewPosts = JSON.parse(newPosts.body)[0].results;
        if (parsedNewPosts) {
          setPosts([...posts, ...parsedNewPosts]);
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
