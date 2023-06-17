import { configureStore, createSlice } from '@reduxjs/toolkit';
import languageReducer from './features/language/languageSlice';
import { settingsMenuSlice } from './features/settingsMenu/settingsMenuSlice';
import { darkModeSlice } from './features/darkMode/darkModeSlice';
import cubeSpinReducer from './features/cubeSpin/cubeSpinSlice';

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
const mockCrosswordSlice = createSlice({
  name: 'crossword',
  initialState: {
    grid: [
      [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
      [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
      [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
      [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
      [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    ],
    userWon: false
  },
  reducers: {
    updateGrid: (state, action) => {
      state.grid = action.payload;
    },
    declareVictory: (state) => {
      state.userWon = true;
    }
  }
});

export const mockStore = configureStore({
  reducer: {
    auth: mockAuthSlice.reducer,
    crossword: mockCrosswordSlice.reducer,
    settingsAreVisible: settingsMenuSlice.reducer,
    cubeSpinsSlowly: cubeSpinReducer,
    darkMode: darkModeSlice.reducer,
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
    crossword: mockCrosswordSlice.reducer,
    language: languageReducer,
    settingsAreVisible: settingsMenuSlice.reducer,
    isDarkMode: darkModeSlice.reducer,
  },
});
