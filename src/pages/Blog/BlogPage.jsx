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
  useEffect(async () => {
    async function fetchData() {
      const data = await getData();
      setBlogData(data);
    }
    await fetchData();
  });

  return (
    <main>
      <p className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </p>
      {blogData ? blogData.map(article => (
        <article>
          <title className='blog-title'>{article.title}</title>
        </article>
      )) : null}
    </main>
  );
}
