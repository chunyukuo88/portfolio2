import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/globalState/auth/authSlice';
import languageReducer from 'src/globalState/language/languageSlice';
import settingsReducer from 'src/globalState/settingsMenu/settingsMenuSlice';
import darkModeReducer from 'src/globalState/darkMode/darkModeSlice';
import cubeSpinReducer from 'src/globalState/cubeSpin/cubeSpinSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    settingsAreVisible: settingsReducer,
    darkMode: darkModeReducer,
    cubeSpinsSlowly: cubeSpinReducer,
  },
  devTools: true,
});
