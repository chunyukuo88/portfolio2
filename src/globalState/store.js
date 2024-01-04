import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/globalState/auth/authSlice';
import languageReducer from 'src/globalState/language/languageSlice';
import settingsReducer from 'src/globalState/settingsMenu/settingsMenuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    settingsAreVisible: settingsReducer,
  },
  devTools: true,
});
