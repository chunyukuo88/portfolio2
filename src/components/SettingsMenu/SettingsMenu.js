import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import strings from 'src/common/strings';
import './Toggle.css';
import './SettingsMenu.css';

export function SettingsMenu(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const language = useSelector(selectCurrentLanguage);

  const ToggleSwitch = () => (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );

  return (
    <div className={settingsAreVisible ? 'settings-open' : 'settings-closed'}>
      <CSSTransition
        in={settingsAreVisible}
        timeout={200}
        classNames={'fade'}
        unmountOnExit
      >
        <ul>
          <li className='sidebar__listItem settings-flex'>{strings.darkMode[language]} <span className='switch-container'><ToggleSwitch /></span></li>
          <li className='sidebar__listItem settings-flex'>{strings.spin[language]} <span className='switch-container'><ToggleSwitch /></span></li>
          <li className='sidebar__listItem'></li>
        </ul>
      </CSSTransition>
    </div>
  );
}
