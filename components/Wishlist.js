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
import { SafeAreaView } from "react-native-safe-area-context"; 

export default function Wishlist() {
  const navigation = useNavigation();
//ekranlar arası geçiş 

  const dispatch = useDispatch();
//redux bağlantısı
  const favorites = useSelector(state => state.favorites); //redux store'daki favori filmleri alır ve favorites değişkenine atar

  useEffect(() => { //component açıldığında veya kapandığında bazı ayarları yapmamızı sağlar
    navigation.getParent()?.setOptions({ 
      tabBarStyle: { display: "none" } //üst tab bar'ı gizler (favoriler ekranında tab bar görünmesin diye)
    });

    return () => { //tab bar'ı tekrar eski haline getirir
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

  const renderItem = ({ item }) => ( //FlatList içinde her bir favori filmi nasıl göstereceğimizi anlatan fonksiyon

    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FavoriteDetail", { movie: item }) // tıklandığında favoritedetail sayfasına gider
        }
      >

        <Image
          source={{ uri: item.Poster }} // apiden resim alır
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => dispatch(toggleFavorite(item))} // tıklandığında favorideyse çıkartır değilse favoriye ekler
          style={styles.heartButton}
        >
          <Ionicons name="heart" size={25} color="red" /> {/**kalp ikonu */} 
        </TouchableOpacity>

        <Text style={styles.title}>{item.Title}</Text> {/**film başlığı ve çıkış yılı  */}
        <Text style={styles.year}>{item.Year}</Text>

      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}> {/** SafeAreaView eklendi, notch/çentik sorununu çözer */}

      <View style={styles.container}> {/** Orijinal container korundu */}

        {/**
         * header
         */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => //kullanıcı geri butonuna tıklarsa eğer önceki ekran varsa geri gider (goBack()) yoksa ana ekrana (Home) gider
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.getParent()?.navigate("Home")
            }
          >
            <Ionicons name="arrow-back" size={24} color={"white"} /> {/**geri butonu */}
          </TouchableOpacity>

          <Text style={styles.titleHeader}>Favoriler</Text>

          <View style={{ width: 24 }} />
        </View>

        {favorites.length === 0 ? ( // favori listesi boş mu dolu mu kontrolü yapar 

          <View style={styles.emptyContainer}> 
            <Text style={styles.emptyText}> {/**boşsa favori film yok yazdırır */}
              Favori Film Yok.
            </Text>
          </View>

        ) : (

          <FlatList
            data={favorites} // doluysa favorileri çeker liste halinde gösterir
            keyExtractor={(item) => item.imdbID} // her birine id verir
            renderItem={renderItem} // her kartın içeriğini oluşturur
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 30
            }}
          />

        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { // SafeAreaView için stil
    flex: 1,
    backgroundColor: '#1F1D2B'
  },

  container: {
    flex: 1,
    backgroundColor: '#1F1D2B'
  },

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
    width: '100%', // ✅ düzeltildi
    height: 300,
    borderRadius: 15
  },

  heartButton: {
    position: 'absolute',
    top: 25,
    right: 25
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