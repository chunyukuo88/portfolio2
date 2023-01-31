import { createSlice } from '@reduxjs/toolkit';

export const humiditySlice = createSlice({
  name: 'humidity',
  initialState: {
    value: 50,
  },
  reducers: {
    updateHumidity: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateHumidity } = humiditySlice.actions;

export default humiditySlice.reducer;
