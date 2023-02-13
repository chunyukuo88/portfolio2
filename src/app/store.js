import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import crosswordReducer from '../features/crossword/crosswordSlice';
import humidityReducer from '../features/humidity/humiditySlice';
import languageReducer from '../features/language/languageSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import tempReducer from '../features/temp/tempSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crossword: crosswordReducer,
    humidity: humidityReducer,
    language: languageReducer,
    navigation: navigationReducer,
    temp: tempReducer,
  },
  devTools: true, // TODO Change this for production
});
