import { createSlice } from '@reduxjs/toolkit';

export const settingsMenuSlice = createSlice({
  name: 'settingsAreVisible',
  initialState: {
    value: false
  },
  reducers: {
    updateSettingsVisibility: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const selectSettingsMenuVisibility = (state) => state.settingsAreVisible.value;
export const { updateSettingsVisibility } = settingsMenuSlice.actions;

export default settingsMenuSlice.reducer;