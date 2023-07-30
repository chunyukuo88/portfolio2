import InfiniteScroll from 'react-infinite-scroller';

const initialUrl = process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteArticles(){
  return <InfiniteScroll />;
}