import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import crosswordReducer from 'src/features/crossword/crosswordSlice';
import languageReducer from 'src/features/language/languageSlice';
import settingsReducer from 'src/features/settingsMenu/settingsMenuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crossword: crosswordReducer,
    language: languageReducer,
    settingsAreVisible: settingsReducer,
    isDarkMode: true,
  },
  devTools: true, // TODO Change this for production
});
