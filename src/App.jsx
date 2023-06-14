import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';

import { Divide as Hamburger } from 'hamburger-react'
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { Sidebar } from './components/Sidebar/Sidebar';
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

const { log } = console;

function App(){
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const [ language ] = useCommonGlobals(routes.blog);
  const dispatch = useDispatch();
  log(`%c${easterEgg}`, 'color: yellow; background: black');
  log('%cgithub.com/chunyukuo88/portfolio2', 'color: yellow; font-size: 2em; background: black;');

  const menuButtonHandler = () => {
    setMenuIsOpen(!menuIsOpen);
    return dispatch(updateSettingsVisibility(false));
  };

  const skillClickHandler = () => {
    setMenuIsOpen(false);
    return dispatch(updateSettingsVisibility(false));
  };

  const getId = () => settingsAreVisible
    ? 'tech-skills-abridged__blurry'
    : 'tech-skills-abridged';

  return (
    <main className={isDarkMode ? undefined : 'light-mode'}>
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

      <section id='primary-content'>
        <Sidebar isOpen={menuIsOpen} />
        <div id='tech-skills-and-settings-container'>
          <ul id={getId()} onClick={skillClickHandler}>
            <li>The Serverless Framework</li>
            <li>{strings.techSkillsTDD[language]}</li>
            <li>Lambdas with Node.js</li>
            <li>Web Components</li>
            <li>Docker Compose</li>
            <li>Testing Library</li>
            <li>Redis Cloud</li>
            <li>Supabase</li>
            <li>SvelteKit</li>
            <li>Scrum</li>
            <li>React</li>
            <li>css</li>
          </ul>
          <Cube />
          <SettingsMenu />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;
