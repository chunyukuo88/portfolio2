import { selectSettingsMenuVisibility } from 'src/features/settingsMenu/settingsMenuSlice';
import { selectCurrentDarkTheme, setDarkMode, setLightMode } from 'src/features/darkMode/darkModeSlice';
import { selectCubeSpinSpeed, toggleToSpinQuickly, toggleToSpinSlowly } from 'src/features/cubeSpin/cubeSpinSlice';
import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import strings from 'src/common/strings';
import './SettingsMenu.css';
import './Toggle.css';

export function SettingsMenu(){
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const shouldSpinSlowly = useSelector(selectCubeSpinSpeed);
  const isDarkMode = useSelector(selectCurrentDarkTheme);
  const language = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  const darkModeToggler = () => (isDarkMode)
    ? dispatch(setLightMode())
    : dispatch(setDarkMode());

  const spinToggler = () => (shouldSpinSlowly)
    ? dispatch(toggleToSpinQuickly())
    : dispatch(toggleToSpinSlowly());

  const settingsClassName = () => {
    const openOrClosed = settingsAreVisible ? 'settings-open' : 'settings-closed';
    const darkOrLight = isDarkMode
      ? openOrClosed
      : `${openOrClosed}__light-mode`;
    return darkOrLight;
  };

  return (
    <div className={settingsClassName()}>
      <CSSTransition
        in={settingsAreVisible}
        timeout={200}
        classNames={'fade'}
        unmountOnExit
      >
        <ul>
          <li className='sidebar__listItem settings-flex'>{strings.darkMode[language]}
            <span className='switch-container'>
              <label className="switch">
                <input type="checkbox" onClick={darkModeToggler} />
                <div className="slider"></div>
              </label>
            </span>
          </li>
          <li className='sidebar__listItem settings-flex'>
            {strings.spin[language]}
            <span className='switch-container'>
              <label className="switch">
                <input type="checkbox" onClick={spinToggler}/>
                <div className="slider"></div>
              </label>
            </span>
          </li>
        </ul>
      </CSSTransition>
    </div>
  );
}
