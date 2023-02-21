import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    value: 'english',
  },
  reducers: {
    updateLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const selectCurrentLanguage = (state) => state.language.value;
export const { updateLanguage } = languageSlice.actions;

export default languageSlice.reducer;
