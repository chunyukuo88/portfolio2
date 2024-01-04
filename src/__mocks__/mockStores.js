import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from 'src/globalState/auth/authSlice';
import settingsReducer from 'src/globalState/settingsMenu/settingsMenuSlice';

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
  },
});

const authSliceLoggedIn = createSlice({
  name: 'auth',
  initialState: {
    user: 'some user',
    token: 'some token',
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      state.user = username;
      state.token = token;
    },
  },
});

export const storeWithUserLoggedIn = configureStore({
  reducer: {
    auth: authSliceLoggedIn.reducer,
    language: languageSliceWithGermanDefault.reducer,
    settingsAreVisible: settingsReducer,
  },
});
