import { Link } from 'react-router-dom';
import strings from '../../common/strings';
import { LinkStyling } from '../../common/globalStyles';
import './BlogPage.css';
import { routes } from '../../routes';
import { useCommonGlobals } from '../../common/hooks';

export function BlogPage(){
  const [ language ] = useCommonGlobals(routes.blog);



  return (
    <main>
      <p className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </p>
      <article>
        <title className='blog-title'></title>
      </article>
    </main>
  );
}
