import { useState } from 'react';
import { Divide as Hamburger } from 'hamburger-react'
import './App.css';

function App(){
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);

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
      <section>
      </section>
      <footer>

      </footer>
    </main>
  );
}

export default App;
