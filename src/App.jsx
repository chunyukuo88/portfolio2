import { useState } from 'react';
import { Divide as Hamburger } from 'hamburger-react'
import './App.css';
import GitHub from 'src/common/icons/contact_GH.svg';
import NPM from 'src/common/icons/contact_NPM.svg'
import LinkedIn from 'src/common/icons/contact_LinkedIn.svg';


import Mail from 'src/common/icons/contact.svg';
import { easterEgg } from './common/strings';

function App(){
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  console.log(`%c${easterEgg}`, 'color: yellow; background: black');
  console.log('%cgithub.com/chunyukuo88/portfolio2', 'color: yellow; font-size: 2em; background: black;');

  const menuButtonHandler = () => setMenuIsOpen(!menuIsOpen);

  return (
    <main>
      <header>
        <div id='name-and-title'>
          <div>Alex Gochenour</div>
          <div>JavaScript Engineer</div>
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

      <section></section>

      <footer>
        <span><img className='main-icons' src={Mail} alt="Exercise icon"/></span>
        <span><img className='main-icons' src={GitHub} alt="Exercise icon"/></span>
        <span><img className='main-icons' src={NPM} alt="Exercise icon"/></span>
        <span><img className='main-icons' src={LinkedIn} alt="Exercise icon"/></span>
      </footer>
    </main>
  );
}

export default App;
