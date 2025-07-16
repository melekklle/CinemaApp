import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
