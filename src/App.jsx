import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';
import { Divide as Hamburger } from 'hamburger-react'
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { SiteInfo } from './components/PrimaryContent/SiteInfo/SiteInfo';
import { LoginPage } from './pages/Login/LoginPage';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Skills } from './components/PrimaryContent/Skills/Skills';
import { AboutMe } from './components/PrimaryContent/AboutMe/AboutMe';
import { InfiniteArticles } from './pages/BreadBlog/InfiniteArticles';
import { Footer } from './components/Footer/Footer';
import { Cube } from './components/Cube/Cube';

import { useDispatch, useSelector } from 'react-redux';
import { logEasterEgg } from './common/utils';
import strings, { contentKeys } from './common/strings';
import {
  selectCurrentDarkTheme,
  updateSettingsVisibility,
  updateLanguage
} from './globalState';
import LanguageIconInverted from './common/icons/language_inverted.svg';
import LanguageIcon from './common/icons/language.svg';
import './App.css';

const languageGlobeStyle = {
  cursor: 'pointer',
  height: '1rem',
  margin: 0
};

function App(){
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const [ language ] = useCommonGlobals();
  const dispatch = useDispatch();

  const [globeIsInverted, setGlobeIsInverted] = useState(false);
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const [ primaryContentKey, setPrimaryContentKey ] = useState(contentKeys.SKILLS);

  if (process.env.NODE_ENV === 'production') {
    logEasterEgg();
  }

  const { CHINESE, ENGLISH, GERMAN, JAPANESE } = strings;

  const languageToggler = (currentLanguage) => {
    switch (currentLanguage) {
      case ENGLISH: return CHINESE;
      case CHINESE: return GERMAN;
      case GERMAN: return JAPANESE;
      case JAPANESE: return ENGLISH;
    }
  };

  const languageSpecificFonts = () => {
    if (language === JAPANESE) return { fontFamily: "'Shippori Mincho B1', serif"};
    if (language === CHINESE) return { fontFamily: "'Noto Serif HK', serif"};
    return { fontFamily: "'Source Code Pro', monospace"};
  }


  const globeClickHandler = () => {
    const newLang = languageToggler(language);
    return dispatch(updateLanguage(newLang));
  };

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
    [contentKeys.BLOG]: <InfiniteArticles menuIsOpen={menuIsOpen}/>,
  };

  const cubeShouldBeVisible = (
    primaryContentKey !== contentKeys.SITE_INFO
    && primaryContentKey !== contentKeys.BLOG
  );

  const ConditionalCube = () => <>{cubeShouldBeVisible ? <Cube /> : null}</>;

  const headerClickHandler = () => setPrimaryContentKey(contentKeys.SKILLS)

  const NormalGlobe = () => (
    <img
      alt={'globe, representing language button'}
      style={languageGlobeStyle}
      src={LanguageIcon}
    />
  );

  const InvertedGlobe = () => (
    <img
      alt={'globe, representing language button'}
      style={languageGlobeStyle}
      src={LanguageIconInverted}
    />
  );

  const Header = () => (
    <header>
      <div id='name-and-title' onClick={headerClickHandler}>
        <div>{strings.myName[language]}</div>
        <div>{strings.myTitle[language]}</div>
      </div>
      <div
        id='language-button-container'
        onClick={globeClickHandler}
        onMouseEnter={() => setGlobeIsInverted(true)}
        onMouseLeave={() => setGlobeIsInverted(false)}
        role='button'
      >
        {!globeIsInverted ? <NormalGlobe /> : <InvertedGlobe />}
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
    <main className={isDarkMode ? undefined : 'light-mode'} style={languageSpecificFonts()}>
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
