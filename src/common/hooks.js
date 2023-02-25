import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga4';
import { selectCurrentLanguage } from '../features/language/languageSlice';
import { selectCurrentUser } from '../features/auth/authSlice';

export function useCommonGlobals(page){
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page });
  }, []);
  const language = useSelector(selectCurrentLanguage);
  const username = useSelector(selectCurrentUser);
  return [language, username];
}
