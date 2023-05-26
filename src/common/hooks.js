import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga4';
import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { selectCurrentUser } from 'src/features/auth/authSlice';

export function useCommonGlobals(page){
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page });
  }, []);
  const language = useSelector(selectCurrentLanguage);
  const username = useSelector(selectCurrentUser);
  return [language, username];
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    }
  }, []);

  return mousePosition;
}