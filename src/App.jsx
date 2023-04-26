import { useMemo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AboutBlock } from './components/AboutBlock/AboutBlock';
import PublishContent from './pages/PublishContent/PublishContent';
import { RequireAuth } from './features/auth/RequireAuth.jsx';
import ReactGA from 'react-ga4';

import { LoginPage } from './pages/Login/LoginPage.jsx';
import { BlogPage } from './pages/Blog/BlogPage';
import Crossword from './pages/Crossword/Crossword';
import AlexBanner from './components/LightbulbBanners/AlexBanner';
import GochenourBanner from './components/LightbulbBanners/GochenourBanner';
import { routes } from './routes.js';
import MainMenu from './components/MainMenu/MainMenu';
import { SkillsPole } from './components/SkillsPole/SkillsPole';
import './App.css';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

const App = () => {
  const PublishContentPage = () => <RequireAuth><PublishContent /></RequireAuth>;
  const allRoutes = useMemo(() => [
    { path: routes.index, Component: HomePage, exact: true },
    { path: routes.login, Component: LoginPage },
    { path: routes.puzzle, Component: Crossword },
    { path: routes.blog, Component: BlogPage },
    { path: routes.publishCrossword, Component: PublishContentPage },
  ], []);

  return (
    <>
      <TransitionGroup>
        <Router>
          <CSSTransition classNames='fade' timeout={300}>
            <Routes>
              {allRoutes.map(({ path, Component, exact }) => (
                  <Route path={path} Component={Component} exact={exact}>
                  </Route>
              ))}
            </Routes>
          </CSSTransition>
        </Router>
      </TransitionGroup>
    </>
  );
}

function HomePage(){
  return (
    <>
      <div className='banner-and-menu-wrapper'>
        <div/>
        <div className='banners'>
          <AlexBanner />
          <GochenourBanner />
        </div>
        <div/>
        <MainMenu />
        <SkillsPole />
        <AboutBlock />
      </div>
    </>
  );
}

export default App;
