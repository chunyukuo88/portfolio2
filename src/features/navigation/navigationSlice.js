import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    value: '/',
  },
  reducers: {
    navigation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { navigation } = navigationSlice.actions;

export default navigationSlice.reducer;