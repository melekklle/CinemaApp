/**
 * store.js
 *
 * Redux store yapılandırması.
 * - favorites slice store’a bağlanır
 * - redux-persist ile AsyncStorage’a kaydedilir
 * - Uygulama kapansa bile favoriler silinmez
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlice';

/**
 * redux-persist importları
 */
import {persistStore,persistReducer,} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Persist ayarları
 * key: storage anahtarı
 * storage: React Native için AsyncStorage
 * whitelist: hangi reducer'lar kaydedilecek
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

/**
 * Tüm reducer'ları birleştiriyoruz
 * İleride auth, user vs eklenirse buraya eklenecek
 */
const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

/**
 * Reducer'ı persist ile sarıyoruz
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Store oluşturma
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // persist için gerekli
    }),
  devTools: true,
});

/**
 * Persistor export edilir
 * App.js içinde kullanılacak
 */
export const persistor = persistStore(store);