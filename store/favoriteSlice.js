import { createSlice } from '@reduxjs/toolkit';

/**
 * favoritesSlice
 *
 * Favori filmleri global state'te tutar.
 * toggleFavorite:
 *   - Eğer film favorilerde varsa çıkarır
 *   - Yoksa ekler
 */

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {

    toggleFavorite(state, action) {

      const existingIndex = state.findIndex(
        item => item.imdbID === action.payload.imdbID
      );

      // Eğer film zaten favorilerde varsa sil
      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      } 
      // Yoksa favorilere ekle
      else {
        state.push(action.payload);
      }
    },

    clearFavorites() {
      return [];
    },

  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;