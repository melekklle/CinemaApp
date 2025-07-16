import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const existingIndex = state.findIndex(
        item => item.imdbID === action.payload.imdbID
      );
      if (existingIndex >= 0) {
        state.splice(existingIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
    clearFavorites(state) {
      return [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
