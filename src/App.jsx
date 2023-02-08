import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import { Counter } from './features/counter/Counter.jsx';
import { useSelector } from 'react-redux';
import { RequireAuth } from './components/RequireAuth.jsx';
import Language from './features/language/Language';
import { Login } from './features/auth/Login.jsx';
import Crossword from './features/crossword/Crossword';
import About from './common/icons/about.png';
import Admin from './common/icons/admin.png';
import Blog from './common/icons/blog.png';
import Contact from './common/icons/contact.png';
import Puzzle from './common/icons/puzzle.png';
import { routes } from './routes.js';
import { supabaseClient } from './features/auth/client.js';
import strings from './common/strings.js';
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
      <li><span><img src={About} alt="About icon"/> </span>{strings.about[language]}</li>
      <li><span><img src={Admin} alt="Admin icon"/> </span>{strings.blog[language]}</li>
      <li><span><img src={Blog} alt="Blog icon"/> </span>{strings.puzzle[language]}</li>
      <li><span><img src={Contact} alt="Contact icon"/></span>{strings.contact[language]}</li>
      <li><span><img src={Puzzle} alt="Puzzle icon"/></span>{strings.admin[language]}</li>
      <li><span><img src={Puzzle} alt="Puzzle icon"/></span><Language/></li>
    </ul>
  );
}

export default App;
