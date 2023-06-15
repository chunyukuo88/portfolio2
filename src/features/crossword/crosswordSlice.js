import { createSlice } from '@reduxjs/toolkit';

const blankGrid = [
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
];

export const crosswordSlice = createSlice({
  name: 'crossword',
  initialState: {
    grid: blankGrid,
    userWon: false
  },
  reducers: {
    resetGrid: (state) => {
      state.grid = blankGrid;
    },
    updateGrid: (state, action) => {
      state.grid = action.payload;
    },
    resetVictoryState: (state) => {
      state.userWon = false;
    },
    declareVictory: (state) => {
      state.userWon = true;
    }
  }
});

export const selectCurrentGrid = (state) => state.crossword.grid;
export const selectUserHasWon = (state) => state.crossword.userWon;
export const { updateGrid, declareVictory, resetGrid, resetVictoryState } = crosswordSlice.actions;

export default crosswordSlice.reducer;