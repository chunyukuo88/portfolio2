import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import strings from '../../common/strings';
import { LinkStyling } from '../../common/globalStyles';
import './BlogPage.css';
import { routes } from '../../routes';
import { useCommonGlobals } from '../../common/hooks';
import { getData } from '../../common/utils';

export function BlogPage(){
  const [ language ] = useCommonGlobals(routes.blog);
  const [ blogData, setBlogData ] = useState(null);
  const Loading = () => <p>{strings.loading[language]}</p>;

  useEffect(() => {
    getData(process.env.REACT_APP_GET_BLOG_ENTRIES)
      .then(data => {
        setBlogData(data);
        console.log('data: ', blogData);
      }
    );
  }, []);

  return (
    <main>
      <p className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </p>
      {blogData ? blogData.map((article, key) => (
        <article key={key}>
          <header className='blog-title'>{article.title}</header>
          <img src={article.imageUrl} alt={`Image for blog with key ${key}`}/>
          <p className='blog-body'>{article.theme}</p>
          <div className='blog-views'>
            <span>Views: {article.views}</span>
            <span>Likes: {article.likes}</span>
          </div>
        </article>
      )) : <Loading />}
    </main>
  );
}
