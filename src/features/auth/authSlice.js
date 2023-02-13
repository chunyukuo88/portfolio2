import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: 'Not authenticated',
  },
  reducers: {
    updateAuth: (state, action) => {
      state.value = action.payload;
      console.dir(state)
      console.dir(action)
    },
  },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;