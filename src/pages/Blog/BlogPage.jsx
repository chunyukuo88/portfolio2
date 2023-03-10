import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import strings from '../../common/strings';
import { LinkStyling } from '../../common/globalStyles';
import { routes } from '../../routes';
import { useCommonGlobals } from '../../common/hooks';
import { getData } from '../../common/utils';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import './BlogPage.css';

export function BlogPage(){
  const [ language ] = useCommonGlobals(routes.blog);
  const [ blogData, setBlogData ] = useState(null);

  useEffect(() => {
    getData(process.env.REACT_APP_GET_BLOG_ENTRIES)
      .then(data => {
        setBlogData(data);
      }
    );
  }, []);

  return (
    <main className='blog-page-content'>
      <p className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </p>
      <section>
        {blogData
          ? blogData.map((article, key) => (
              <article className='article' key={key}>
                  <header className='blog-title'>{article.title}</header>
                  <img
                    className='blog-image'
                    src={article.imageUrl}
                    alt={`For blog with key ${key}`}
                  />
                  <p className='blog-body'>{article.theme}</p>
                  <div className='blog-views-and-likes'>
                    <span>Views: {article.views}</span>
                    <span>Likes: {article.likes}</span>
                  </div>
              </article>
            ))
          : <LoadingSpinner language={language} />
        }
      </section>
    </main>
  );
}
