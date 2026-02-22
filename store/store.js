/**
 * store.js
 *
 * Redux store yapılandırması.
 * - favorites slice store'a bağlanır
 * - redux-persist ile AsyncStorage’a kaydedilir
 * - Uygulama kapansa bile favoriler silinmez
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit'; // store ve reducerları yönetmek için gerekli
import favoritesReducer from './favoriteSlice'; // favori filmler slice'ı

/**
 * redux-persist importları
 */
import { persistStore, persistReducer } from 'redux-persist'; // store'u kalıcı yapmak için
import AsyncStorage from '@react-native-async-storage/async-storage'; // react native için kalıcı depolama

/**
 * persist ayarları kalıcı yönetme 
 * key: storage anahtarı
 * storage: React Native için AsyncStorage
 * whitelist: hangi reducer'lar kaydedilecek
 */
const persistConfig = {
  key: 'root', // storage anahtar adı
  storage: AsyncStorage, // kullanılacak depolama
  whitelist: ['favorites'], // sadece favorites reducer kalıcı olacak
};

/**
 *tüm reducer'ları birleştiriyoruz
 * ileride auth(kimlik doğrulama), user vs eklenirse buraya eklenecek
 */
const rootReducer = combineReducers({
  favorites: favoritesReducer, // favorites slice rootReducer’a ekleniyor
});

/**
 * reducer(state güncelleyen)'ı persist ile sarıyoruz
 */
const persistedReducer = persistReducer(persistConfig, rootReducer); // kalıcı reducer oluşturuldu

/**
 * store oluşturma
 */
export const store = configureStore({
  reducer: persistedReducer, // store reducer olarak persist edilmiş reducer kullanılıyor
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist ile uyumlu olması için gerekli
    }),
  devTools: true, // chrome Redux DevTools için açık
});

/**
 * persistor export edilir
 * App.js içinde kullanılacak
 */
export const persistor = persistStore(store); // store verisini AsyncStorage ile senkronize eder