import { useMemo } from 'react';
import { AboutBlock } from './components/AboutBlock/AboutBlock';
import { PublishContentPage } from './pages/PublishContent/PublishContentPage';
import { LoginPage } from './pages/Login/LoginPage.jsx';
import { BlogPage } from './pages/Blog/BlogPage';
import CrosswordPage from './pages/Crossword/CrosswordPage';
import { routes } from './routes.js';

import ReactGA from 'react-ga4';
import AlexBanner from './components/LightbulbBanners/AlexBanner';
import GochenourBanner from './components/LightbulbBanners/GochenourBanner';
import MainMenu from './components/MainMenu/MainMenu';
import { SkillsPole } from './components/SkillsPole/SkillsPole';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

const App = () => {
  const allRoutes = useMemo(() => [
    { path: routes.index, Component: HomePage, exact: true },
    { path: routes.login, Component: LoginPage },
    { path: routes.puzzle, Component: CrosswordPage },
    { path: routes.blog, Component: BlogPage },
    { path: routes.publishCrossword, Component: PublishContentPage },
  ], []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {allRoutes.map(({ path, Component, exact }) => (
            <Route key={path} path={`${path}*`} Component={Component} exact={exact} />
          ))}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

function HomePage(){
  return (
    <>
      <div className='banner-and-menu-wrapper'>
        <div />
        <div className='banners'>
          <AlexBanner />
          <GochenourBanner />
        </div>
        <div />
        <MainMenu />
        <SkillsPole />
        <AboutBlock />
      </div>
    </>
  );
}

export default App;
