import { Cube } from '../../components/Cube/Cube';
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
      <div className='blog-coming-soon'>
        Blog feature coming soon!
      </div>
      <p className='back-to-home '>
        <Link style={LinkStyling} to='/'>{strings.homePage[language]}</Link>
      </p>
      <div className='green-cube-wrapper'>
        <Cube />
      </div>
    </main>
  );
}