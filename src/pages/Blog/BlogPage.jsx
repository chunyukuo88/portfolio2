import { Cube } from '../../components/Cube/Cube';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import strings from '../../common/strings';
import { LinkStyling } from '../../common/globalStyles';
import './BlogPage.css';

export function BlogPage(){
  const language = useSelector((state) => state.language.value);
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/blog' });
  }, []);

  return (
    <main>
      <div className='blog-coming-soon'>
        Blog feature coming soon!
      </div>
      <p>
        <Link style={LinkStyling} to='/'>{strings.homePage[language]}</Link>
      </p>
      <div className='green-cube-wrapper'>
        <Cube />
      </div>
    </main>
  );
}