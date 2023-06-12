import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { selectSettingsMenuVisibility } from './settingsMenuSlice';
import { updateSettingsVisibility } from './settingsMenuSlice';

import strings from 'src/common/strings';

export function SettingsToggler() {
  const language = useSelector(selectCurrentLanguage);
  const settingsAreVisible = useSelector(selectSettingsMenuVisibility);
  const dispatch = useDispatch();

  const clickHandler = () => {
    alert('hhh')
    // return dispatch(updateSettingsVisibility(!settingsAreVisible));
    return dispatch(updateSettingsVisibility(false));
  };

  return <div onClick={clickHandler}>{strings.settings[language]}</div>;
}
