import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';
import { Divide as Hamburger } from 'hamburger-react'
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { SiteInfo } from './components/PrimaryContent/SiteInfo/SiteInfo';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Skills } from './components/PrimaryContent/Skills/Skills';
import { AboutMe } from './components/PrimaryContent/AboutMe/AboutMe';
import { Footer } from './components/Footer/Footer';
import { Cube } from './components/Cube/Cube';

import { selectCurrentDarkTheme } from './features/darkMode/darkModeSlice';
import {
  selectSettingsMenuVisibility,
  updateSettingsVisibility
} from './features/settingsMenu/settingsMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logEasterEgg } from './common/utils';
import strings from './common/strings';
import { routes } from './routes';
import './App.css';
import {LoginPage} from "./pages/Login/LoginPage";

function App(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const [ language ] = useCommonGlobals(routes.blog);
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const [ primaryContentKey, setPrimaryContentKey ] = useState('skills');
  const dispatch = useDispatch();

  logEasterEgg();

  const menuButtonHandler = () => {
    setMenuIsOpen(!menuIsOpen);
    return dispatch(updateSettingsVisibility(false));
  };

  const primaryContentClickHandler = () => {
    setMenuIsOpen(false);
    return dispatch(updateSettingsVisibility(false));
  };

  const primaryContentMap = {
    skills: <Skills { ...{primaryContentClickHandler, language, menuIsOpen}}/>,
    aboutMe: <AboutMe language={language} menuIsOpen={menuIsOpen}/>,
    siteInfo: <SiteInfo language={language} menuIsOpen={menuIsOpen} />,
    login: <LoginPage />
    // funStuff: <div>Coming Soon</div>,
  };

  const ConditionalCube = () => (
    <>
      {primaryContentKey !== 'siteInfo' && <Cube />}
    </>
  );

  const Header = () => (
    <header>
      <div id='name-and-title' onClick={() => setPrimaryContentKey('skills')}>
        <div>{strings.myName[language]}</div>
        <div>{strings.myTitle[language]}</div>
      </div>
      <div id='language-button-container'>
        <Language />
      </div>
      <div onClick={menuButtonHandler} id='main-menu-button-container'>
        <Hamburger
          hideOutline={false}
          label='show menu'
          size={16}
          toggle={setMenuIsOpen}
          toggled={menuIsOpen}
        />
      </div>
    </header>
  );

  return (
    <main className={isDarkMode ? undefined : 'light-mode'}>
      <Header/>

      <section>
        <Sidebar isOpen={menuIsOpen} setPrimaryContentKey={setPrimaryContentKey} />
         <div id='primary-content-and-settings-container' >
           <div id='primary-content' onClick={primaryContentClickHandler}>
             {primaryContentMap[primaryContentKey]}
           </div>
         </div>
      </section>
      <div id='settings-menu-container'>
        <SettingsMenu />
      </div>
      <ConditionalCube />
      <Footer />
    </main>
  );
}

export default App;
