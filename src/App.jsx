import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';

import { Divide as Hamburger } from 'hamburger-react'
import GitHub from 'src/common/icons/contact_GH.svg';
import NPM from 'src/common/icons/contact_NPM.svg'
import LinkedIn from 'src/common/icons/contact_LinkedIn.svg';
import Mail from 'src/common/icons/contact.svg';
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { Sidebar } from './components/Sidebar/Sidebar';

import strings, { easterEgg } from './common/strings';
import { routes } from './routes';
import './App.css';
import {useDispatch} from "react-redux";
import {updateSettingsVisibility} from "./features/settingsMenu/settingsMenuSlice";


function App(){
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const [ language ] = useCommonGlobals(routes.blog);
  const dispatch = useDispatch();
  console.log(`%c${easterEgg}`, 'color: yellow; background: black');
  console.log('%cgithub.com/chunyukuo88/portfolio2', 'color: yellow; font-size: 2em; background: black;');

  const menuButtonHandler = () => {
    setMenuIsOpen(!menuIsOpen);
    return dispatch(updateSettingsVisibility(false));
  }

  return (
    <main>
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
          <ul id='tech-skills-abridged'>
            <li>The Serverless Framework</li>
            <li>{strings.techSkillsTDD[language]}</li>
            <li>Lambdas (Node.js)</li>
            <li>Web Components</li>
            <li>Docker Compose</li>
            <li>Testing Library</li>
            <li>Supabase</li>
            <li>SvelteKit</li>
            <li>Scrum</li>
            <li>React</li>
            <li>Redis</li>
            <li>css</li>
          </ul>
          <SettingsMenu />
        </div>
      </section>

      <footer>
        <span><img className='main-icons' src={Mail} alt='Exercise icon'/></span>
        <span><img className='main-icons' src={GitHub} alt='Exercise icon'/></span>
        <span><img className='main-icons' src={NPM} alt='Exercise icon'/></span>
        <span><img className='main-icons' src={LinkedIn} alt='Exercise icon'/></span>
      </footer>
    </main>
  );
}

export default App;
