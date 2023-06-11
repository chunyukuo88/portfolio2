import { useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react'
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
          <Hamburger toggled={menuIsOpen} toggle={setMenuIsOpen} />
        </div>
      </header>
      <section>

      </section>
    </main>
  );
}

export default App;
