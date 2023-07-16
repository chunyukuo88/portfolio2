import { useState } from 'react';
import { useCommonGlobals } from './common/hooks';

import { Divide as Hamburger } from 'hamburger-react'
import Language from './features/language/Language';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { SiteInfo } from './components/PrimaryContent/SiteInfo/SiteInfo';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Skills } from './components/PrimaryContent/Skills/Skills';
import { AboutMe } from './components/PrimaryContent/AboutMe/AboutMe';
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
    skills: <Skills { ...{primaryContentClickHandler, language, menuIsOpen}}/>,
    aboutMe: <AboutMe language={language} menuIsOpen={menuIsOpen}/>,
    siteInfo: <SiteInfo language={language} menuIsOpen={menuIsOpen} />,
    // funStuff: <div>Coming Soon</div>,
  };

  const Header = () => (
    <header>
      <div id='name-and-title' onClick={() => setPrimaryContentKey('skills')}>
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
    <div className='card'>
      <Header/>

      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur assumenda aut commodi consectetur culpa cumque doloremque earum enim eos eum ex id illum, ipsam magni maxime mollitia, nam nemo nostrum optio quia quo sed sit tempore ut, veritatis voluptas. Aspernatur consectetur consequatur dolores explicabo repellendus repudiandae sapiente? Aut consequuntur cupiditate deserunt illum labore nostrum officia optio quaerat quam qui quis, quisquam quod suscipit vel voluptate! Distinctio eos ipsa officiis porro quo suscipit veritatis voluptates? Alias blanditiis earum, fuga id illum iste minus necessitatibus neque quas quisquam quos recusandae repellat saepe sit suscipit ullam voluptas. Aliquam consequatur error, impedit ipsam nobis officia officiis omnis perferendis quae, quaerat repellat reprehenderit sapiente ut vel, voluptatum. Ad aliquam blanditiis delectus molestiae nulla! Consequuntur ducimus laboriosam nisi optio provident quis sapiente voluptatum. Accusantium cum deleniti error, est in inventore sed vero. Adipisci cumque dignissimos distinctio dolore dolorum facere id ipsam, itaque laborum magnam minus nesciunt nihil omnis perspiciatis porro quas quis tenetur. Cupiditate ducimus eaque eius error libero officia temporibus. Beatae delectus est eum facilis hic rem sequi similique soluta, voluptas. Dolor eos exercitationem maiores molestiae pariatur possimus provident quod recusandae vel? Aliquam, beatae culpa eligendi inventore iste magnam quis quisquam repellat repudiandae? Deleniti est laborum molestias neque nobis unde? Culpa fugit laboriosam quam tempore veritatis. Ab aliquam architecto at autem consectetur cum distinctio dolor eaque eligendi esse expedita ipsam iste laudantium molestias nam neque quae quia quod rem rerum sapiente sint, tempore unde veritatis voluptatibus? Delectus doloribus enim eum, expedita in natus quia sequi? Accusamus architecto dicta earum explicabo quis ullam voluptatibus. Explicabo illum minus placeat porro! Adipisci autem iure laudantium odit perferendis placeat quas quia sequi vero. Modi numquam recusandae soluta temporibus ut? Asperiores at cupiditate excepturi, fugit odio ut voluptas. Accusamus consequatur hic ipsam nulla. Facere itaque laborum nisi saepe.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur assumenda aut commodi consectetur culpa cumque doloremque earum enim eos eum ex id illum, ipsam magni maxime mollitia, nam nemo nostrum optio quia quo sed sit tempore ut, veritatis voluptas. Aspernatur consectetur consequatur dolores explicabo repellendus repudiandae sapiente? Aut consequuntur cupiditate deserunt illum labore nostrum officia optio quaerat quam qui quis, quisquam quod suscipit vel voluptate! Distinctio eos ipsa officiis porro quo suscipit veritatis voluptates? Alias blanditiis earum, fuga id illum iste minus necessitatibus neque quas quisquam quos recusandae repellat saepe sit suscipit ullam voluptas. Aliquam consequatur error, impedit ipsam nobis officia officiis omnis perferendis quae, quaerat repellat reprehenderit sapiente ut vel, voluptatum. Ad aliquam blanditiis delectus molestiae nulla! Consequuntur ducimus laboriosam nisi optio provident quis sapiente voluptatum. Accusantium cum deleniti error, est in inventore sed vero. Adipisci cumque dignissimos distinctio dolore dolorum facere id ipsam, itaque laborum magnam minus nesciunt nihil omnis perspiciatis porro quas quis tenetur. Cupiditate ducimus eaque eius error libero officia temporibus. Beatae delectus est eum facilis hic rem sequi similique soluta, voluptas. Dolor eos exercitationem maiores molestiae pariatur possimus provident quod recusandae vel? Aliquam, beatae culpa eligendi inventore iste magnam quis quisquam repellat repudiandae? Deleniti est laborum molestias neque nobis unde? Culpa fugit laboriosam quam tempore veritatis. Ab aliquam architecto at autem consectetur cum distinctio dolor eaque eligendi esse expedita ipsam iste laudantium molestias nam neque quae quia quod rem rerum sapiente sint, tempore unde veritatis voluptatibus? Delectus doloribus enim eum, expedita in natus quia sequi? Accusamus architecto dicta earum explicabo quis ullam voluptatibus. Explicabo illum minus placeat porro! Adipisci autem iure laudantium odit perferendis placeat quas quia sequi vero. Modi numquam recusandae soluta temporibus ut? Asperiores at cupiditate excepturi, fugit odio ut voluptas. Accusamus consequatur hic ipsam nulla. Facere itaque laborum nisi saepe.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aspernatur assumenda aut commodi consectetur culpa cumque doloremque earum enim eos eum ex id illum, ipsam magni maxime mollitia, nam nemo nostrum optio quia quo sed sit tempore ut, veritatis voluptas. Aspernatur consectetur consequatur dolores explicabo repellendus repudiandae sapiente? Aut consequuntur cupiditate deserunt illum labore nostrum officia optio quaerat quam qui quis, quisquam quod suscipit vel voluptate! Distinctio eos ipsa officiis porro quo suscipit veritatis voluptates? Alias blanditiis earum, fuga id illum iste minus necessitatibus neque quas quisquam quos recusandae repellat saepe sit suscipit ullam voluptas. Aliquam consequatur error, impedit ipsam nobis officia officiis omnis perferendis quae, quaerat repellat reprehenderit sapiente ut vel, voluptatum. Ad aliquam blanditiis delectus molestiae nulla! Consequuntur ducimus laboriosam nisi optio provident quis sapiente voluptatum. Accusantium cum deleniti error, est in inventore sed vero. Adipisci cumque dignissimos distinctio dolore dolorum facere id ipsam, itaque laborum magnam minus nesciunt nihil omnis perspiciatis porro quas quis tenetur. Cupiditate ducimus eaque eius error libero officia temporibus. Beatae delectus est eum facilis hic rem sequi similique soluta, voluptas. Dolor eos exercitationem maiores molestiae pariatur possimus provident quod recusandae vel? Aliquam, beatae culpa eligendi inventore iste magnam quis quisquam repellat repudiandae? Deleniti est laborum molestias neque nobis unde? Culpa fugit laboriosam quam tempore veritatis. Ab aliquam architecto at autem consectetur cum distinctio dolor eaque eligendi esse expedita ipsam iste laudantium molestias nam neque quae quia quod rem rerum sapiente sint, tempore unde veritatis voluptatibus? Delectus doloribus enim eum, expedita in natus quia sequi? Accusamus architecto dicta earum explicabo quis ullam voluptatibus. Explicabo illum minus placeat porro! Adipisci autem iure laudantium odit perferendis placeat quas quia sequi vero. Modi numquam recusandae soluta temporibus ut? Asperiores at cupiditate excepturi, fugit odio ut voluptas. Accusamus consequatur hic ipsam nulla. Facere itaque laborum nisi saepe.
        </p>
      </main>
      <footer>
        hello
      </footer>
    </div>
  );
  // return (
  //   <main className={isDarkMode ? undefined : 'light-mode'}>
  //     <Header />
  //
  //     <section>
  //       <Sidebar isOpen={menuIsOpen} setPrimaryContentKey={setPrimaryContentKey} />
  //       <div id='primary-content-and-settings-container' >
  //         <div id='primary-content' onClick={primaryContentClickHandler}>
  //           {primaryContentMap[primaryContentKey]}
  //         </div>
  //       </div>
  //     </section>
  //
  //     <div id='settings-menu-container'>
  //       <SettingsMenu />
  //     </div>
  //
  //     <Cube />
  //
  //     <Footer />
  //   </main>
  // );
}

export default App;
