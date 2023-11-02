import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentLanguage } from 'src/globalState/language/languageSlice';
import { selectSettingsMenuVisibility } from './settingsMenuSlice';
import { updateSettingsVisibility } from './settingsMenuSlice';
import strings from 'src/common/strings';

export function SettingsToggler() {
  const language = useSelector(selectCurrentLanguage);
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const dispatch = useDispatch();

  const clickHandler = () => {
    const newValue = !settingsAreVisible;
    return dispatch(updateSettingsVisibility(newValue));
  };

  return <div onClick={clickHandler}>{strings.settings[language]}</div>;
}
