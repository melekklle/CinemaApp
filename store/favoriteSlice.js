import { createSlice } from '@reduxjs/toolkit'; // redux toolkit'ten slice oluşturmak için gerekli fonksiyon

const favoritesSlice = createSlice({
  name: 'favorites', // slice ismi redux store'da hangi slice olduğunu belirtir

  initialState: [], // favoriler başlangıçta boş bir array olarak tutulur her item bir film objesi

  reducers: {
    toggleFavorite: (state, action) => { // favori ekleme/çıkarma işlemi yapan reducer
      const movie = action.payload; // kullanıcının favorilere eklemek/çıkarmak istediği film

      if (!movie?.imdbID) { // eğer film objesinde imdbID yoksa state'i değiştirme
        return state;
      }

      const exists = state.find(item => item.imdbID === movie.imdbID); // film zaten ekli mi kontrol et

      if (exists) { // eğer film favorilerde varsa
        return state.filter(item => item.imdbID !== movie.imdbID); // film favorilerden çıkar
      }

      return [...state, movie]; // yoksa filmi favorilere ekle
    },

    clearFavorites: () => { // tüm favorileri temizleyen reducer
      return []; // boş array döndür
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions; // reducer fonksiyonlarını dışa aktar
export default favoritesSlice.reducer; // slice reducer'ı store'a eklemek için dışa aktar