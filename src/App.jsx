import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';

import { Divide as Hamburger } from 'hamburger-react'
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Skills } from './components/Skills/Skills';
import { AboutMe } from './components/AboutMe/AboutMe';
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
    skills: <Skills/>,
    aboutMe: <AboutMe language={language} settingsAreVisible={settingsAreVisible}/>,
    siteInfo: <div>Coming Soon</div>,
    resume: <div>Coming Soon</div>,
    funStuff: <div>Coming Soon</div>,
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
        <Sidebar isOpen={menuIsOpen} setPrimaryContentKey={setPrimaryContentKey} />
        <div id='primary-content-and-settings-container' onClick={primaryContentClickHandler}>
          <div id='primary-content' >
            {primaryContentMap[primaryContentKey]}
          </div>
        </div>
      </section>

      <div id='settings-menu-container'>
        <SettingsMenu />
      </div>

      <Cube />

      <Footer />
    </main>
  );
}

export default App;
