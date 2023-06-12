import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import strings from 'src/common/strings';
import './SettingsMenu.css';

const { ENGLISH } = strings;

export function SettingsMenu(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);

  return (
    <div className={settingsAreVisible ? 'settings-open' : 'settings-closed'}>
      <CSSTransition
        in={settingsAreVisible}
        timeout={200}
        classNames={'fade'}
        unmountOnExit
      >
        <ul>
          <li>{strings.darkMode[ENGLISH]}</li>
          <li>Setting 2</li>
          <li>Setting 3</li>
        </ul>
      </CSSTransition>
    </div>
  );
}
