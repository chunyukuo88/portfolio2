import { configureStore, createSlice } from '@reduxjs/toolkit';
import languageReducer from './globalState/language/languageSlice';
import { settingsMenuSlice } from './globalState/settingsMenu/settingsMenuSlice';

const mockAuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const mockStore = configureStore({
  reducer: {
    auth: mockAuthSlice.reducer,
    settingsAreVisible: settingsMenuSlice.reducer,
    language: languageReducer,
  },
});

export const mockSettingsSlice = createSlice({
  name: 'settingsAreVisible',
  initialState: {
    value: true
  },
  reducers: {
    updateSettingsVisibility: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const mockStoreSettingsOpen = configureStore({
  reducer: {
    auth: mockAuthSlice.reducer,
    settingsAreVisible: mockSettingsSlice.reducer,
    language: languageReducer,
  },
});


const mockAuthSliceLoggedIn = createSlice({
  name: 'auth',
  initialState: {
    user: 'test user',
    token: 'test token',
  },
  reducers: {
    updateAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const mockStoreLoggedIn = configureStore({
  reducer: {
    auth: mockAuthSliceLoggedIn.reducer,
    language: languageReducer,
    settingsAreVisible: settingsMenuSlice.reducer,
  },
});
