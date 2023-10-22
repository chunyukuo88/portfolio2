import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import languageReducer from 'src/features/language/languageSlice';
import settingsReducer from 'src/features/settingsMenu/settingsMenuSlice';
import darkModeReducer from 'src/features/darkMode/darkModeSlice';
import cubeSpinReducer from 'src/features/cubeSpin/cubeSpinSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    settingsAreVisible: settingsReducer,
    darkMode: darkModeReducer,
    cubeSpinsSlowly: cubeSpinReducer,
  },
  devTools: true, // TODO Change this for production
});
