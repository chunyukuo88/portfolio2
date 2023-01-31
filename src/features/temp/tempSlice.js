import { createSlice } from '@reduxjs/toolkit';

export const tempSlice = createSlice({
  name: 'temp',
  initialState: {
    value: 45,
  },
  reducers: {
    updateTemp: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateTemp } = tempSlice.actions;

export default tempSlice.reducer;