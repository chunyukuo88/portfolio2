import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import strings from 'src/common/strings';
import './SettingsMenu.css';

export function SettingsMenu(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const language = useSelector(selectCurrentLanguage);

  return (
    <div className={settingsAreVisible ? 'settings-open' : 'settings-closed'}>
      <CSSTransition
        in={settingsAreVisible}
        timeout={200}
        classNames={'fade'}
        unmountOnExit
      >
        <ul>
          <li className='sidebar__listItem'>{strings.darkMode[language]}</li>
          <li className='sidebar__listItem'>Setting 2</li>
          <li className='sidebar__listItem'>Setting 3</li>
        </ul>
      </CSSTransition>
    </div>
  );
}
