import { createSlice } from '@reduxjs/toolkit';

/**
 * favoritesSlice
 *
 * Bu slice:
 * - Favori filmleri global state'te tutar
 * - toggleFavorite ile ekleme / çıkarma yapar
 * - Aynı filmi 2 kere eklemez
 */

const favoritesSlice = createSlice({
  name: 'favorites',

  /**
   * initialState:
   * Favoriler bir array olarak tutulur.
   * Her item bir film objesidir.
   */
  initialState: [],

  reducers: {

    /**
     * toggleFavorite
     *
     * Eğer film zaten varsa:
     * → state'ten siler
     *
     * Eğer film yoksa:
     * → state'e ekler
     *
     * ÖNEMLİ:
     * - imdbID üzerinden kontrol yapılır
     * - Duplicate oluşmaz
     * - React key hatası vermez
     */
    toggleFavorite: (state, action) => {

      const movie = action.payload;

      // imdbID kontrolü (güvenlik için)
      if (!movie?.imdbID) {
        return state;
      }

      // Film zaten var mı?
      const exists = state.find(
        item => item.imdbID === movie.imdbID
      );

      // Eğer varsa → çıkar
      if (exists) {
        return state.filter(
          item => item.imdbID !== movie.imdbID
        );
      }

      // Yoksa → ekle
      return [...state, movie];
    },

    /**
     * clearFavorites
     *
     * Tüm favorileri temizler
     */
    clearFavorites: () => {
      return [];
    },

  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;