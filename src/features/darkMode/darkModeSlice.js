import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: true,
  },
  reducers: {
    setDarkMode: (state) => {
      state.value = true;
    },
    setLightMode: (state) => {
      state.value = false;
    },
  }
});

export const selectCurrentDarkTheme = (state) => state.darkMode.value;
export const { setDarkMode, setLightMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;