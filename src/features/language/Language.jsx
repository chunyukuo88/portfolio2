import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLanguage } from './languageSlice';
import strings from '../../common/strings.js';

function Language() {
  const language = useSelector((state) => state.language.value);
  const dispatch = useDispatch();
  const { CHINESE, ENGLISH, RUSSIAN } = strings;
  const languageToggler = (currentLanguage) => {
    switch (currentLanguage) {
      case ENGLISH: return CHINESE;
      case CHINESE: return RUSSIAN;
      case RUSSIAN: return ENGLISH;
      default: return ENGLISH;
    };
  };

  const clickHandler = () => {
    const newLang = languageToggler(language);
    return dispatch(updateLanguage(newLang));
  };

  return (
    <div role='button' id='language-button' onClick={clickHandler}>
      {strings.language[language]}
    </div>
  );
}

export default Language;
