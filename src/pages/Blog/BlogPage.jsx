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
        const sortedData = data.sort((a, b) => a.creationTimeStamp > b.creationTimeStamp ? -1 : 1);
        setBlogData(sortedData);
      }
    );
  }, []);

  const asDateString = (article) => new Date(article.creationTimeStamp).toISOString().slice(0,10);

  return (
    <main role='main' className='blog-page-content'>
      <nav className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </nav>
      <section>
        {blogData
          ? blogData.map((article, key) => (
              <article className='article' key={key}>
                  <header className='blog-title'>{article.title}</header>
                  <h2 className='publication-date'>{asDateString(article)}</h2>
                  <img
                    className='blog-image'
                    src={article.imageUrl}
                    aria-label={`Image for blog titled ${article.title}`}
                    loading={key === 0 ? 'eager' : 'lazy'}
                  />
                  <p className='blog-body'>{article.theme}</p>
              </article>
            ))
          : <LoadingSpinner language={language} />
        }
      </section>
    </main>
  );
}
