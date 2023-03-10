import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import crosswordReducer from '../features/crossword/crosswordSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crossword: crosswordReducer,
    language: languageReducer,
  },
  devTools: true, // TODO Change this for production
});
