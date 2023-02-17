import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ContactWrapper } from './components/ContactTiles/ContactWrapper';
import { AboutBlockWrapper } from './components/AboutBlock/AboutBlock';
import { useSelector } from 'react-redux';
import { RequireAuth } from './features/auth/RequireAuth.jsx';
import ReactGA from 'react-ga4';

import { LoginPage } from './pages/Login/LoginPage.jsx';
import { BlogPage } from './pages/Blog/BlogPage';
import Language from './features/language/Language';
import Crossword from './pages/Crossword/Crossword';
import AlexBanner from './components/LightbulbBanners/AlexBanner';
import GochenourBanner from './components/LightbulbBanners/GochenourBanner';

import strings from './common/strings.js';
import { routes } from './routes.js';

import Admin from '../src/common/icons/admin.svg';
import LanguageIcon from '../src/common/icons/language.svg';
import Contact from '../src/common/icons/contact.svg';
import Puzzle from '../src/common/icons/puzzle.svg';
import BlogIcon from '../src/common/icons/blog.svg';
import AboutIcon from '../src/common/icons/about.svg';
import './App.css';
import PublishCrosswordPanel from "./pages/Crossword/PublishCrosswordPanel";

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='content-below-header'>
          <Routes>
            <Route exact path={routes.index} element={<HomePage />}/>
            <Route exact path={routes.login} element={<LoginPage />}/>
            <Route exact path={routes.puzzle} element={<Crossword />}/>
            <Route exact path={routes.blog} element={<BlogPage />}/>
            <Route exact path={routes.profile} element={<RequireAuth><Profile /></RequireAuth>} />
            <Route exact path={routes.publishCrossword} element={<RequireAuth><PublishCrosswordPanel /></RequireAuth>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function Profile(){
  return <>PROFILE! You are authenticated.</>;
}

function HomePage(){
  const language = useSelector((state) => state.language.value);
  const username = useSelector((state) => state.auth.user);
  const [displayContactInfo, setDisplayContactInfo] = useState(false);
  const [displayAboutBlock, setDisplayAboutBlock] = useState(false);
  const LinkStyling = { color: '#cccccc', textDecoration: 'none', textTransform: 'uppercase'};

  return (
    <main className='main-page-container'>
      <div className='banner-and-menu-wrapper'>
        <ul className='main-menu-wrapper'>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={LanguageIcon} alt='Language icon'/></span>
            <div><Language/></div>
          </li>
          <li role='button' onClick={() => setDisplayAboutBlock(true)} className='menu-block'>
            <span><img className='main-icons' src={AboutIcon} alt='About icon'/></span>
            <div>{strings.about[language]}</div>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Contact} alt='Contact icon'/></span>
            <div onClick={() => setDisplayContactInfo(true)}>{strings.contact[language]}</div>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={BlogIcon} alt='blog icon'/></span>
            <Link style={LinkStyling} to={routes.blog}>{strings.blog[language]}</Link>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Puzzle} alt='Puzzle icon'/></span>
            <Link style={LinkStyling} to={routes.puzzle}>{strings.puzzle[language]}</Link>
          </li>
          {
            username
              ? <li role='button' className='menu-block'>
                <span><img className='main-icons' src={Puzzle} alt='Puzzle icon'/></span>
                <Link style={LinkStyling} to={routes.publishCrossword}>Publish Crossword</Link>
              </li>
              : null
          }
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Admin} alt='Admin icon'/></span>
            <Link style={LinkStyling} to={routes.login} >
              {(username)
                ? username
                : strings.admin[language]
              }
            </Link>
          </li>
        </ul>
        <div />
        <GochenourBanner />
        <div />
        <AlexBanner />
        <div />
        {displayAboutBlock ? <AboutBlockWrapper visible={displayAboutBlock} /> : null}
      </div>
      {displayContactInfo ? <ContactWrapper visible={displayContactInfo} /> : null}
    </main>
  );
}

export default App;
