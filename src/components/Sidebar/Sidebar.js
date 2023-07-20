import { selectCurrentDarkTheme } from 'src/features/darkMode/darkModeSlice';
import { SettingsToggler } from 'src/features/settingsMenu/SettingsToggler';
import { CSSTransition } from 'react-transition-group';
import { useCommonGlobals } from 'src/common/hooks';
import { useSelector } from 'react-redux';

import strings from 'src/common/strings';
import { routes } from 'src/routes';
import './Sidebar.css';

export function Sidebar({ isOpen, setPrimaryContentKey }){
  const [ language ] = useCommonGlobals(routes.index);
  const isDarkMode = useSelector(selectCurrentDarkTheme);

  const menuItems = [
    { title: strings.aboutMe[language], key: 'aboutMe' },
    { title: strings.siteInfo[language], key: 'siteInfo' },
    { title: strings.login[language], key: 'login' },
    // { title: strings.resume[language], key: 'resume' },
    // { title: strings.funStuff[language], key: 'funStuff' },
  ];

  const classNameBasedOnWhetherOpen = (isOpen)
    ? 'sidebar-open'
    : 'sidebar-closed';

  const classNameBasedOnDarkMode = () => {
    const base = classNameBasedOnWhetherOpen;
    return isDarkMode ? base : base + '__light-mode';
  };

  const Settings = () => (
    <li key={'SettingsToggler'}>
      <div className='sidebar__listItem'>
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames={'fade'}
          unmountOnExit
        >
          <SettingsToggler />
        </CSSTransition>
      </div>
    </li>
  );

  return (
    <div className={classNameBasedOnDarkMode()}>
      <ul>
        {
          menuItems.map((item) => (
            <li key={item.title}>
              <div className='sidebar__listItem'>
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  classNames={'fade'}
                  unmountOnExit
                >
                  <div onClick={() => setPrimaryContentKey(item.key)}>{item.title}</div>
                </CSSTransition>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
