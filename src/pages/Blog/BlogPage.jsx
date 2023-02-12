import './BlogPage.css';
import { Cube } from '../../components/Cube/Cube';
import strings from '../../common/strings';
import { useSelector } from 'react-redux';
import {useEffect} from "react";
import ReactGA from "react-ga4";

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
        <a className='back-to-home' href="/">{strings.homePage[language]}</a>
      </p>
      <div className='green-cube-wrapper'>
        <Cube />
      </div>
    </main>
  );
}