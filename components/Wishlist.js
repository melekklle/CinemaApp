/**
 * Wishlist (Favorite Screen)
 *
 * Bu ekran:
 * - Redux store'daki favori filmleri listeler
 * - toggleFavorite ile favoriden çıkarma işlemi yapar
 * - TabBar'ı gizler
 * - Favori yoksa boş ekran gösterir
 */

import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoriteSlice";

export default function Wishlist() {

  /**
   * Navigation hook
   */
  const navigation = useNavigation();

  /**
   * Redux bağlantıları
   */
  const dispatch = useDispatch();

  /**
   * Store'dan favori filmleri alıyoruz
   */
  const favorites = useSelector(state => state.favorites);

  /**
   * useEffect:
   * Ekran açıldığında TabBar gizlenir.
   * Unmount olduğunda eski stil geri yüklenir.
   */
  useEffect(() => {

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          borderTopWidth: 0,
          height: 65,
          paddingTop: 10,
          paddingHorizontal: 45,
        },
      });
    };

  }, [navigation]);

  /**
   * FlatList renderItem fonksiyonu
   */
  const renderItem = ({ item }) => (

    <View style={styles.card}>

      /**
       * Film detay ekranına navigation
       */
      <TouchableOpacity
        onPress={() =>
      navigation.navigate("FavoriteDetail", { movie: item })        }
      >

        <Image
          source={{ uri: item.Poster }}
          style={styles.image}
        />

        /**
         * Favoriden çıkarma butonu
         * Redux dispatch çalışır
         */
        <TouchableOpacity
          onPress={() => dispatch(toggleFavorite(item))}
          style={{ position: 'absolute', top: 25, right: 25 }}
        >
          <Ionicons name="heart" size={25} color="red" />
        </TouchableOpacity>

        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.year}>{item.Year}</Text>

      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      /**
       * HEADER
       */
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={"white"} />
        </TouchableOpacity>

        <Text style={styles.titleHeader}>Favorite</Text>

        <View style={{ width: 24 }} />
      </View>

      /**
       * Eğer favori listesi boşsa boş mesaj göster
       */
      {favorites.length === 0 ? (

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Favori Film Yok.
          </Text>
        </View>

      ) : (

        /**
         * Favori filmler listesi
         */
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 30
          }}
        />

      )}

    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1D2B' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20
  },
  titleHeader: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'montserrat-bold'
  },
  card: {
    backgroundColor: '#252836',
    borderRadius: 15,
    marginBottom: 25,
    padding: 20,
    position: 'relative'
  },
  image: {
    width: 'auto',
    height: 300,
    borderRadius: 15
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'montserrat-bold',
    marginTop: 10
  },
  year: {
    color: '#9FA5C0',
    fontSize: 18,
    fontFamily: 'montserrat-regular',
    marginTop: 4
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#9FA5C0',
    fontSize: 20,
    fontFamily: 'montserrat-bold'
  },
});
