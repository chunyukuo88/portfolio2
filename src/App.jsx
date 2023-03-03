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
import './App.css';
import { SkillsPole } from './components/SkillsPole/SkillsPole';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

const App = () => (
  <>
    <div className='banners'>
      <AlexBanner />
      <GochenourBanner />
    </div>
    <Router>
        <Routes>
          <Route exact path={routes.index} element={<HomePage />}/>
          <Route exact path={routes.login} element={<LoginPage />}/>
          <Route exact path={routes.puzzle} element={<Crossword />}/>
          <Route exact path={routes.blog} element={<BlogPage />}/>
          <Route exact path={routes.publishCrossword} element={<RequireAuth><PublishContent /></RequireAuth>} />
        </Routes>
    </Router>
  </>
);

function HomePage(){
  return (
    <>
      <div className='banner-and-menu-wrapper'>
        <div/><div/><div/>
        <MainMenu />
        <SkillsPole />
        <AboutBlock />
      </div>
    </>
  );
}

export default App;
