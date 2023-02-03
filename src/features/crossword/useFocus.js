import React, { useState, useEffect } from 'react';

const useFocus = (ref, defaultState = false) => {

  const [isFocused, setIsFocused] = useState(defaultState);

  useEffect(() => {

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    ref.current.addEventListener('focus', onFocus);
    ref.current.addEventListener('blur', onBlur);

    return () => {
      ref.current.removeEventListener('focus', onFocus);
      ref.current.removeEventListener('blur', onBlur);
    };

  }, []);

  return isFocused;
};

export default useFocus;