import { CSSTransition } from 'react-transition-group';
import strings from 'src/common/strings';
import './Sidebar.css';

export function Sidebar({ isOpen }){
  const menuItems = [
    { title: strings.aboutMe[strings.ENGLISH] },
    { title: strings.aboutSite[strings.ENGLISH] },
    { title: strings.resume[strings.ENGLISH] },
    { title: strings.funStuff[strings.ENGLISH] },
  ];

  return (
    <div className={isOpen ? 'sidebar-open' : 'sidebar-closed'}>
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
                  <span>{item.title}</span>
                </CSSTransition>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
