import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import { useSelector } from 'react-redux';

import { toggleTheme } from './utils';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

export function SettingsMenu(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);

  return settingsAreVisible ? <p>hello!</p> : null;
  // return (
  //   <div className={isVisible ? 'settings-open' : 'settings-closed'}>
  //     <ul>
  //       <li onClick={toggleTheme}>{strings.darkMode[ENGLISH]}</li>
  //     </ul>
  //   </div>
  // );
}
