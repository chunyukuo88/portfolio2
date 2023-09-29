import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';
import { Divide as Hamburger } from 'hamburger-react'
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { SiteInfo } from './components/PrimaryContent/SiteInfo/SiteInfo';
import { LoginPage } from './pages/Login/LoginPage';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Skills } from './components/PrimaryContent/Skills/Skills';
import { BreadBlog } from './pages/BreadBlog/BreadBlog';
import { AboutMe } from './components/PrimaryContent/AboutMe/AboutMe';
import { Footer } from './components/Footer/Footer';
import { Cube } from './components/Cube/Cube';

import { selectCurrentDarkTheme } from './features/darkMode/darkModeSlice';
import { updateSettingsVisibility } from './features';
import { useDispatch, useSelector } from 'react-redux';
import { logEasterEgg } from './common/utils';
import strings, { contentKeys } from './common/strings';
import { routes } from './routes';
import './App.css';

function App(){
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const [ language ] = useCommonGlobals(routes.blog);
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const [ primaryContentKey, setPrimaryContentKey ] = useState(contentKeys.SKILLS);
  const dispatch = useDispatch();

  if (process.env.NODE_ENV === 'production') {
    logEasterEgg();
  }

  const menuButtonHandler = () => {
    setMenuIsOpen(!menuIsOpen);
    return dispatch(updateSettingsVisibility(false));
  };

  const primaryContentClickHandler = () => {
    setMenuIsOpen(false);
    return dispatch(updateSettingsVisibility(false));
  };

  const primaryContentMap = {
    [contentKeys.SKILLS]: <Skills { ...{primaryContentClickHandler, language, menuIsOpen}}/>,
    [contentKeys.ABOUT_ME]: <AboutMe language={language} menuIsOpen={menuIsOpen}/>,
    [contentKeys.SITE_INFO]: <SiteInfo language={language} menuIsOpen={menuIsOpen} />,
    [contentKeys.ADMIN]: <LoginPage setPrimaryContentKey={setPrimaryContentKey}/>,
    [contentKeys.BLOG]: <BreadBlog language={language} menuIsOpen={menuIsOpen} />,
  };

  const cubeShouldBeVisible = (
    primaryContentKey !== contentKeys.SITE_INFO
    && primaryContentKey !== contentKeys.BLOG
  );

  const ConditionalCube = () => (
    <>
      {cubeShouldBeVisible ? <Cube /> : null}
    </>
  );

  const Header = () => (
    <header>
      <div id='name-and-title' onClick={() => setPrimaryContentKey(contentKeys.SKILLS)}>
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
        <Sidebar isOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} setPrimaryContentKey={setPrimaryContentKey} />
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
