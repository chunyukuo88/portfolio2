import {useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga4';
import { selectCurrentLanguage } from 'src/globalState/language/languageSlice';
import { selectCurrentUser } from 'src/globalState/auth/authSlice';

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






const useDocumentHeight = () => {
  const getHeight = useCallback(
    () =>
      window.visualViewport ? window.visualViewport.height : window.innerHeight,
    [],
  )
  const [height, setHeight] = useState(getHeight())

  useEffect(() => {
    const handleResize = (e) => {
      setHeight(getHeight());
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [getHeight])

  return height;
}

export default useDocumentHeight