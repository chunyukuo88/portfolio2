import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import { Counter } from './features/counter/Counter.jsx';
import { useSelector } from 'react-redux';
import { RequireAuth } from './components/RequireAuth.jsx';
import Language from './features/language/Language';
import { Login } from './features/auth/Login.jsx';
import Crossword, { emptyGrid } from './features/crossword/Crossword';
import { routes } from './routes.js';
import { supabaseClient } from './features/auth/client.js';
import strings from './common/strings.js';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route exact path={routes.index} element={<HomePage />}/>
          <Route exact path={routes.counter} element={<CounterPage />}/>
          <Route exact path={routes.login} element={<LoginPage />}/>
          <Route exact path={routes.profile} element={<RequireAuth><Profile /></RequireAuth>} />
        </Routes>
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
    <header>
      <Language />
      <button id='home-button' onClick={() => navigate(routes.index)}>🏠</button>
      <button id='counter-button' onClick={() => navigate(routes.counter)}>{strings.goToCounter[language]}</button>
      {auth?.session?.user ?
        <button id='profile-button' onClick={() => navigate(routes.profile)}>{strings.profile[language]}</button>
        : null
      }
      {
        auth?.session?.user
          ? <button id='logout-button' onClick={logoutHandler}>{strings.logout[language]}</button>
          : <button id='login-button' onClick={() => navigate(routes.login)}>{strings.login[language]}</button>
      }
    </header>
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
  return (
    <div className='page'>
      <p>{auth.user?.email && `Greetings, ${auth.user.email}!`}</p>
      <p>{strings.homeGreeting[language]}</p>
      <Crossword grid={emptyGrid}/>
    </div>
  );
}

export default App;
