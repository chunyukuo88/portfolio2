import { CSSTransition } from 'react-transition-group';
import { useCommonGlobals } from 'src/common/hooks';

import strings, { contentKeys } from 'src/common/strings';
import { routes } from 'src/routes';
import './Sidebar.css';

export function Sidebar({ isOpen, setMenuIsOpen, setPrimaryContentKey }){
  const [ language ] = useCommonGlobals(routes.index);

  const menuItems = [
    { title: strings.aboutMe[language], key: contentKeys.ABOUT_ME },
    { title: strings.siteInfo[language], key: contentKeys.SITE_INFO },
    { title: strings.admin[language], key: contentKeys.ADMIN },
    { title: strings.blog[language], key: contentKeys.BLOG},
  ];

  const classNameBasedOnWhetherOpen = (isOpen)
    ? 'sidebar-open'
    : 'sidebar-closed';

  const clickHandler = (item) => {
    setPrimaryContentKey(item.key);
    if (item.key === contentKeys.ADMIN) {
      return setMenuIsOpen(false);
    }
  };

  return (
    <div className={classNameBasedOnWhetherOpen}>
      <ul>
        {
          menuItems.map((item) => (
            <li key={item.title}>
              <div className='sidebar__listItem'>
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  classNames='fade'
                  unmountOnExit
                >
                  <div onClick={() => clickHandler(item)}>
                    {item.title}
                  </div>
                </CSSTransition>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
