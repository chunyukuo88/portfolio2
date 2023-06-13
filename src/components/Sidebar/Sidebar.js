import { useCommonGlobals } from 'src/common/hooks';
import { SettingsToggler } from 'src/features/settingsMenu/SettingsToggler';
import { CSSTransition } from 'react-transition-group';

import strings from 'src/common/strings';
import { routes } from 'src/routes';
import './Sidebar.css';

export function Sidebar({ isOpen }){
  const [ language ] = useCommonGlobals(routes.index);

  const menuItems = [
    { title: strings.aboutMe[language] },
    { title: strings.aboutSite[language] },
    { title: strings.resume[language] },
    { title: strings.funStuff[language] },
  ];

  return (
    <div className={isOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <ul>
        {
          menuItems.map((item) => (
            <li key={item.title || 'toggler'}>
              <div className='sidebar__listItem'>
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  classNames={'fade'}
                  unmountOnExit
                >
                  <div>{item.title || item.component}</div>
                </CSSTransition>
              </div>
            </li>
          ))
        }
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
      </ul>
    </div>
  );
}
