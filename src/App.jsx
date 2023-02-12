import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactWrapper } from './components/ContactTiles/ContactWrapper';
import { AboutBlockWrapper } from './components/AboutBlock/AboutBlock';
import { useSelector } from 'react-redux';
import { RequireAuth } from './features/auth/RequireAuth.jsx';
import ReactGA from 'react-ga4';


import { Login } from './pages/Login/Login.jsx';
import { BlogPage } from './pages/Blog/BlogPage';
import Language from './features/language/Language';
import Crossword from './pages/Crossword/Crossword';
import AlexBanner from './components/LightbulbBanners/AlexBanner';
import GochenourBanner from './components/LightbulbBanners/GochenourBanner';

import { routes } from './routes.js';
import strings from './common/strings.js';

import Admin from '../src/common/icons/admin.svg';
import LanguageIcon from '../src/common/icons/language.svg';
import Contact from '../src/common/icons/contact.svg';
import Puzzle from '../src/common/icons/puzzle.svg';
import BlogIcon from '../src/common/icons/blog.svg';
import AboutIcon from '../src/common/icons/about.svg';
import './App.css';

ReactGA.initialize( '353414815');

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='content-below-header'>
          <Routes>
            <Route exact path={routes.index} element={<HomePage />}/>
            <Route exact path={routes.login} element={<LoginPage />}/>
            <Route exact path={routes.puzzle} element={<PuzzlePage />}/>
            <Route exact path={routes.blog} element={<Blog />}/>
            <Route exact path={routes.profile} element={<RequireAuth><Profile /></RequireAuth>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function Blog(){
  return (<><BlogPage /></>)
}
function PuzzlePage(){
  return (<><Crossword /></>);
}

function Profile(){
  return <>PROFILE! You are authenticated.</>;
}

function LoginPage(){
  return (<div className='page'><Login /></div>);
}

function HomePage(){
  const language = useSelector((state) => state.language.value);
  const [displayContactInfo, setDisplayContactInfo] = useState(false);
  const [displayAboutBlock, setDisplayAboutBlock] = useState(false);

  return (
    <main className='main-page-container'>
      <div className='banner-and-menu-wrapper'>
        <ul className='main-menu-wrapper'>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={LanguageIcon} alt="Language icon"/></span>
            <a><Language/></a>
          </li>
          <li role='button' onClick={() => setDisplayAboutBlock(true)} className='menu-block'>
            <span><img className='main-icons' src={AboutIcon} alt="About icon"/></span>
            <a>{strings.about[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Contact} alt="Contact icon"/></span>
            <a onClick={() => setDisplayContactInfo(true)}>{strings.contact[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={BlogIcon} alt="blog icon"/></span>
            <a href="/blog">{strings.blog[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Puzzle} alt="Puzzle icon"/></span>
            <a href="/puzzle">{strings.puzzle[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Admin} alt="Admin icon"/></span>
            <a href="/login">{strings.admin[language]}</a>
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
