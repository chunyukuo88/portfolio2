import { configureStore, createSlice } from '@reduxjs/toolkit';
import humidityReducer from './features/humidity/humiditySlice';
import languageReducer from './features/language/languageSlice';
import navigationReducer from './features/navigation/navigationSlice';
import tempReducer from './features/temp/tempSlice';
import crosswordReducer from './features/crossword/crosswordSlice';

const mockAuthSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {
      session: {
        accessToken: 'foo',
        user: 'bar',
      },
      user: {
        email: 'test@test.com'
      },
    },
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
    crossword: crosswordReducer,
    humidity: humidityReducer,
    language: languageReducer,
    navigation: navigationReducer,
    temp: tempReducer,
  },
});
