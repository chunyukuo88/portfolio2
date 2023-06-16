import { createSlice } from '@reduxjs/toolkit';

export const settingsMenuSlice = createSlice({
  name: 'cubeSpinsSlowly',
  initialState: {
    value: true
  },
  reducers: {
    toggleToSpinSlowly: (state) => {
      state.value = true;
    },
    toggleToSpinQuickly: (state) => {
      state.value = false;
    }
  },
});

export const selectCubeSpinSpeed = (state) => state.cubeSpinsSlowly.value;
export const { toggleToSpinQuickly, toggleToSpinSlowly } = settingsMenuSlice.actions;

export default settingsMenuSlice.reducer;
