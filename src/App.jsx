import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import { Counter } from './features/counter/Counter.jsx';
import { useSelector } from 'react-redux';
import { RequireAuth } from './components/RequireAuth.jsx';
import { Login } from './features/auth/Login.jsx';
import Language from './features/language/Language';
import Crossword from './features/crossword/Crossword';
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
            <Route exact path={routes.contact} element={<ContactPage />}/>
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
    // <header>
    //   <Language />
    //   <button id='home-button' onClick={() => navigate(routes.index)}>🏠</button>
    //   <button onClick={() => navigate(routes.puzzle)}>Puzzle</button>
    //   <button onClick={() => navigate(routes.contact)}>Contact</button>
    //   <button onClick={() => navigate(routes.blog)}>Blog</button>
    //   <button id='counter-button' onClick={() => navigate(routes.counter)}>{strings.goToCounter[language]}</button>
    //   {auth?.session?.user ?
    //     <button id='profile-button' onClick={() => navigate(routes.profile)}>{strings.profile[language]}</button>
    //     : null
    //   }
    //   {
    //     auth?.session?.user
    //       ? <button id='logout-button' onClick={logoutHandler}>{strings.logout[language]}</button>
    //       : <button id='login-button' onClick={() => navigate(routes.login)}>{strings.login[language]}</button>
    //   }
    // </header>
  );
}

function ContactPage(){
  return (
    <>
      Kontakteirung
    </>
  )
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
      //{/*<p>{auth.user?.email && `Greetings, ${auth.user.email}!`}</p>*/}
      //{/*<p>{strings.homeGreeting[language]}</p>*/}
  return (
    <ul>
      <li className='five'>
        <span>
          <img className='main-icons' src={AboutIcon} alt="About icon"/>
        </span>
        <a href="#">
          {strings.about[language]}
        </a>
      </li>
      <li className='four'>
        <span>
          <img className='main-icons' src={Blog} alt="Blog icon"/>
        </span>
        <a href="#">
          {strings.blog[language]}
        </a>
      </li>
      <li className='three'>
        <span>
          <img className='main-icons' src={Puzzle} alt="Puzzle icon"/>
        </span>
        <a href="/puzzle">
          {strings.puzzle[language]}
        </a>
      </li>
      <li className='two'>
        <span>
          <img className='main-icons' src={Contact} alt="Contact icon"/>
        </span>
        <a href="#">
          {strings.contact[language]}
        </a>
      </li>
      <li className='one'>
        <span>
          <img className='main-icons' src={Admin} alt="Admin icon"/>
        </span>
        <a href="#">
          {strings.admin[language]}
        </a>
      </li>
      <li className='zero'>
        <span>
          <img className='main-icons' src={LanguageIcon} alt="Language icon"/>
        </span>
        <a href="#">
          <Language/>
        </a>
      </li>
    </ul>
  );
}

export default App;
