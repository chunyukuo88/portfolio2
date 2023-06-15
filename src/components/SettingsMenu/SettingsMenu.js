import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import {selectCurrentDarkTheme, setDarkMode, setLightMode} from 'src/features/darkMode/darkModeSlice';
import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import strings from 'src/common/strings';
import './SettingsMenu.css';
import './Toggle.css';
import {selectCubeSpinSpeed, toggleToSpinQuickly, toggleToSpinSlowly} from "../../features/cubeSpin/cubeSpinSlice";

export function SettingsMenu(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const shouldSpinSlowly = useSelector(selectCubeSpinSpeed);
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const language = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  console.log('shouldSpinSlowly: ', shouldSpinSlowly);
  const ToggleSwitch = () => (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );

  const darkModeToggler = () => (isDarkMode)
    ? dispatch(setLightMode())
    : dispatch(setDarkMode());

  const spinToggler = () => (shouldSpinSlowly)
    ? dispatch(toggleToSpinQuickly())
    : dispatch(toggleToSpinSlowly());

  return (
    <div className={settingsAreVisible ? 'settings-open' : 'settings-closed'}>
      <CSSTransition
        in={settingsAreVisible}
        timeout={200}
        classNames={'fade'}
        unmountOnExit
      >
        <ul>
          <li className='sidebar__listItem settings-flex'>{strings.darkMode[language]} <span onClick={darkModeToggler} className='switch-container'><ToggleSwitch /></span></li>
          <li className='sidebar__listItem settings-flex'>{strings.spin[language]} <span onClick={spinToggler} className='switch-container'><ToggleSwitch /></span></li>
          <li className='sidebar__listItem'></li>
        </ul>
      </CSSTransition>
    </div>
  );
}
