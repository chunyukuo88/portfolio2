import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import { useSelector } from 'react-redux';

import { toggleTheme } from './utils';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

export function SettingsMenu({ isOpen }){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);

  return isOpen ? (
    <div className={settingsAreVisible ? 'settings-open' : 'settings-closed'}>
      <ul>
        <li onClick={toggleTheme}>{strings.darkMode[ENGLISH]}</li>
      </ul>
    </div>
  ) : null;
}
