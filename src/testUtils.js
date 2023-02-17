import { configureStore, createSlice } from '@reduxjs/toolkit';
import humidityReducer from './features/humidity/humiditySlice';
import languageReducer from './features/language/languageSlice';
import navigationReducer from './features/navigation/navigationSlice';
import tempReducer from './features/temp/tempSlice';

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
})

export const mockStore = configureStore({
  reducer: {
    auth: mockAuthSlice.reducer,
    crossword: mockCrosswordSlice.reducer,
    humidity: humidityReducer,
    language: languageReducer,
    navigation: navigationReducer,
    temp: tempReducer,
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
    humidity: humidityReducer,
    language: languageReducer,
    navigation: navigationReducer,
    temp: tempReducer,
  },
});