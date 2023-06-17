import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';

import { Divide as Hamburger } from 'hamburger-react'
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Skills } from './Skills';
import { AboutMe } from './AboutMe';
import { Footer } from './components/Footer/Footer';
import { Cube } from './components/Cube/Cube';

import { selectCurrentDarkTheme } from './features/darkMode/darkModeSlice';
import {
  selectSettingsMenuVisibility,
  updateSettingsVisibility
} from './features/settingsMenu/settingsMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import strings, { easterEgg } from './common/strings';
import { routes } from './routes';
import './App.css';

function App({ logger }){
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const [ language ] = useCommonGlobals(routes.blog);
  const dispatch = useDispatch();
  logger(`%c${easterEgg}`, 'color: yellow; background: black');
  logger('%cgithub.com/chunyukuo88/portfolio2', 'color: yellow; font-size: 2em; background: black;');

  const menuButtonHandler = () => {
    setMenuIsOpen(!menuIsOpen);
    return dispatch(updateSettingsVisibility(false));
  };

  const skillClickHandler = () => {
    setMenuIsOpen(false);
    return dispatch(updateSettingsVisibility(false));
  };

  const Header = () => (
    <header>
      <div id='name-and-title'>
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
      <Header />

      <section id='primary-content'>
        <Sidebar isOpen={menuIsOpen} />
        <div id='tech-skills-and-settings-container'>
          <AboutMe />
          <Cube />
          <SettingsMenu />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;
