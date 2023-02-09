import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import { Counter } from './features/counter/Counter.jsx';
import { ContactWrapper } from './components/ContactWrapper';
import { AboutBlockWrapper } from './components/AboutBlock';
import { useSelector } from 'react-redux';
import { RequireAuth } from './components/RequireAuth.jsx';
import { Login } from './features/auth/Login.jsx';
import Language from './features/language/Language';
import Crossword from './features/crossword/Crossword';
import GochenourBanner from './components/GochenourBanner';
import AlexBanner from './components/AlexBanner';
import { routes } from './routes.js';
import { supabaseClient } from './features/auth/client.js';
import strings from './common/strings.js';
import Admin from '../src/common/icons/admin.svg';
import LanguageIcon from '../src/common/icons/language.svg';
import Contact from '../src/common/icons/contact.svg';
import Puzzle from '../src/common/icons/puzzle.svg';
import Blog from '../src/common/icons/blog.svg';
import AboutIcon from '../src/common/icons/about.svg';
import './App.css';


function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <div className='content-below-header'>
          <Routes>
            <Route exact path={routes.index} element={<HomePage />}/>
            <Route exact path={routes.counter} element={<CounterPage />}/>
            <Route exact path={routes.login} element={<LoginPage />}/>
            <Route exact path={routes.puzzle} element={<PuzzlePage />}/>
            <Route exact path={routes.blog} element={<BlogPage />}/>
            <Route exact path={routes.profile} element={<RequireAuth><Profile /></RequireAuth>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function Header(){
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.value);
  const auth = useSelector((state) => state.auth.value);
  const logoutHandler = async () => {
    await supabaseClient.auth.signOut();
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <></>
  );
}

function BlogPage(){
  return (
    <>
      Blogimus
    </>
  )
}

function PuzzlePage(){
  return (
    <>
      <Crossword />
    </>
  );
}

function Profile(){
  return <>PROFILE! You are authenticated.</>;
}

function LoginPage(){
  return (
    <div className='page'>
      <Login />
    </div>
  );
}

function CounterPage(){
  return (
    <div className='page counter'>
      <Counter/>
    </div>
  );
}

function HomePage(){
  const language = useSelector((state) => state.language.value);
  const auth = useSelector((state) => state.auth.value);
  const [displayContactInfo, setDisplayContactInfo] = useState(false);
  const [displayAboutBlock, setDisplayAboutBlock] = useState(false);

  // TODO
  // <AlexBanner />
  return (
    <main className='main-page-container'>
      <div className='banner-and-menu-wrapper'>
        <ul className='main-menu-wrapper'>
          <li role='button' onClick={() => setDisplayAboutBlock(true)} className='menu-block'>
            <span><img className='main-icons' src={AboutIcon} alt="About icon"/></span>
            <a>{strings.about[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Blog} alt="Blog icon"/></span>
            <a href="#">{strings.blog[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Puzzle} alt="Puzzle icon"/></span>
            <a href="/puzzle">{strings.puzzle[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Contact} alt="Contact icon"/></span>
            <a onClick={() => setDisplayContactInfo(true)}>{strings.contact[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={Admin} alt="Admin icon"/></span>
            <a href="/login">{strings.admin[language]}</a>
          </li>
          <li role='button' className='menu-block'>
            <span><img className='main-icons' src={LanguageIcon} alt="Language icon"/></span>
            <a><Language/></a>
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
