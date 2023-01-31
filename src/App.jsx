import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import { Counter } from './features/counter/Counter.jsx';
import { store } from './globalState/store.js';
import { Provider, useSelector } from 'react-redux'
import { RequireAuth } from './components/RequireAuth.jsx';
import Language from './features/language/Language';
import { Login } from './features/auth/Login.jsx';
import { routes } from './routes.js';
import { supabaseClient } from './features/auth/client.js';
import strings from './common/strings.js';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route exact path={routes.index} element={<HomePage />}/>
            <Route exact path={routes.counter} element={<CounterPage />}/>
            <Route exact path={routes.login} element={<LoginPage />}/>
            <Route exact path={routes.profile} element={<RequireAuth><Profile /></RequireAuth>} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
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
      <button onClick={() => navigate(routes.index)}>🏠</button>
      <button onClick={() => navigate(routes.counter)}>{strings.goToCounter[language]}</button>
      {auth?.session?.user && <button onClick={() => navigate(routes.profile)}>Profile</button>}
      {
        auth?.session?.user
          ? <button onClick={logoutHandler}>{strings.logout[language]}</button>
          : <button onClick={() => navigate(routes.login)}>{strings.login[language]}</button>
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
    </div>
  );
}

export default App;
