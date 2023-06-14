import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import crosswordReducer from 'src/features/crossword/crosswordSlice';
import languageReducer from 'src/features/language/languageSlice';
import settingsReducer from 'src/features/settingsMenu/settingsMenuSlice';
import darkModeReducer from 'src/features/darkMode/darkModeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crossword: crosswordReducer,
    language: languageReducer,
    settingsAreVisible: settingsReducer,
    darkMode: darkModeReducer,
  },
  devTools: true, // TODO Change this for production
});
