import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';

import { Divide as Hamburger } from 'hamburger-react'
import GitHub from 'src/common/icons/contact_GH.svg';
import NPM from 'src/common/icons/contact_NPM.svg'
import LinkedIn from 'src/common/icons/contact_LinkedIn.svg';
import Mail from 'src/common/icons/contact.svg';
import Language from './features/language/Language';
import { Sidebar } from './components/Sidebar/Sidebar';

import strings, { easterEgg } from './common/strings';
import { routes } from './routes';
import './App.css';


function App(){
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const [ language ] = useCommonGlobals(routes.blog);
  console.log(`%c${easterEgg}`, 'color: yellow; background: black');
  console.log('%cgithub.com/chunyukuo88/portfolio2', 'color: yellow; font-size: 2em; background: black;');

  const menuButtonHandler = () => setMenuIsOpen(!menuIsOpen);

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
        <ul id='tech-skills-abridged'>
          <li>Test-driven Development, always</li>
          <li>The Serverless Framework</li>
          <li>Lambdas (Node.js)</li>
          <li>Web Components</li>
          <li>Docker Compose</li>
          <li>Testing Library</li>
          <li>SvelteKit</li>
          <li>Scrum</li>
          <li>React</li>
          <li>css</li>
        </ul>
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
