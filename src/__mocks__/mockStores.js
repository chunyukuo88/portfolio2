import {configureStore, createSlice} from '@reduxjs/toolkit';
import authReducer from 'src/globalState/auth/authSlice';
import settingsReducer from 'src/globalState/settingsMenu/settingsMenuSlice';
import darkModeReducer from 'src/globalState/darkMode/darkModeSlice';
import cubeSpinReducer from 'src/globalState/cubeSpin/cubeSpinSlice';

const languageSliceWithGermanDefault = createSlice({
  name: 'language',
  initialState: {
    value: 'german',
  },
  reducers: {
    updateLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const storeWithGermanDefault = configureStore({
  reducer: {
    auth: authReducer,
    language: languageSliceWithGermanDefault.reducer,
    settingsAreVisible: settingsReducer,
    darkMode: darkModeReducer,
    cubeSpinsSlowly: cubeSpinReducer,
  },
  devTools: true, // TODO Change this for production
});
