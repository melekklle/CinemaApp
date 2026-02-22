/**
 * DownloadScreen Component
 *
 * Bu ekran indirilen filmleri listelemek için oluşturulmuştur
 * API üzerinden film verisi çekilir ve ScrollView içinde render edilir
 * Navigation kullanılarak FilmDetail ekranına geçiş yapılır
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DownloadScreen({ navigation }) {

  /**
   * movies  api den  gelen film verilerini tutar
   * Local state kullanılmıştır çünkü bu veri sadece bu componentte kullanılıyor
   */
  const [movies, setMovies] = useState([]);

  /**
   * progress indirme yüzdesini temsil eder
   * 0 ile 1 arasında değer alır
   */
  const [progress, setProgress] = useState(0.75);

  /**
   * useEffect Component mount olduğunda çalışır
   * dependency array boş olduğu için sadece 1 kere tetiklenir
   */
  useEffect(() => {

    /**
     * fetchMovies  RapidAPI üzerinden film verisi çeker
     * async/await kullanılmıştır çünkü API çağrısı asenkron bir işlemdir
     */
    const fetchMovies = async () => {
      const url =
        "https://movie-database-alternative.p.rapidapi.com/?s=batman&r=json";

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "06f4e582b0msh1e7308013f2fc09p17a14bjsnb865cf6ef178",
          "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
        },
      };

      try {
        /**
         * fetch  HTTP isteği gönderir.
         * await işlem tamamlanana kadar bekler
         */
        const response = await fetch(url, options);

        /**
         * eğer response başarısızsa hata fırlatılır
         */
        if (!response.ok) {
          throw new Error("API response failed");
        }
        const json = await response.json();

        /**
         * eğer json.Search varsa state'e aktarılır
         * yoksa boş array atanır
         */
        setMovies(json.Search || []);

      } catch (error) {

        /**
         * hata yakalama mekanizması
         * API başarısız olursa uygulama çökmez
         */
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();

  }, []); // <-- Dependency array boş  sadece ilk render'da çalışır


  return (

    /**
     * scrollView kullanıldı çünkü liste scroll edilebilir
     * contentContainerStyle alt boşluk eklemek için kullanılır
     */
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
  <SafeAreaView>
      {/* header */}
      <View style={styles.headerRow}>

        {/* geri butonu */}
        <TouchableOpacity onPress={() => navigation.goBack()}> {/**geri butonuna tıklandığında en sonki sayfaya geri döner */}
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Download</Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>

        {/**
         * movies.map Array içindeki her filmi render eder
         * her item için unique key kullanılmıştır (imdbID)
         */}
        {movies.map((item, index) => (

          <TouchableOpacity
            key={item.imdbID}
            onPress={() => navigation.navigate("FilmDetail", { movie: item })}
            style={[styles.card, index === 0 && styles.activeCard]}
          >

            {/* Film Posteri */}
            <Image
              source={{
                uri:
                  item.Poster !== "N/A" //*eğer gösterilcek bir resim yoksa geçici resim koyar n/a dönerse image boş kalır*/ 
                    ? item.Poster
                    : "https://via.placeholder.com/60" //**geçici resim *
              }}
              style={styles.poster}
            />

            {/* film bilgi */}
            <View style={styles.info}>

              <Text style={styles.category}>Action</Text>
              <Text style={styles.title}>{item.Title}</Text>

              {/**
               * eğer ilk film ise progress bilgisi gösterilir
               * değilse sabit bilgi gösterilir
               */}
              {index === 0 ? ( // kısaca if else yapısı  eğer film ilk sıradaysa indirme bilgisini göster
                <View style={styles.row}>
                  <Feather name="download" size={14} color="#9FA5C0" />
                  <Text style={styles.metaText}>1.25 of 1.78 GB</Text>
                  <Text style={styles.metaText}> | {Math.round(progress * 100)}%</Text> {/**indirme yüzdesi progress 26'ncı satırda 0.75 olarak belirledik .
                   *  math.round tam sayıya yuvarlar */}
                </View>
              ) : (
                <Text style={styles.metaText}>Movie | 1.78 GB</Text>
              )}

            </View>
            {[0,4,6,8].includes(index) && ( // eğer film 0,4,6,8. sıradaysa pause ikonu ekler değilse hiçbişey gösterilmez
              <View style={styles.progressIcon}>
                <Feather name="pause-circle" size={36} color="white" />
              </View>
            )}

          </TouchableOpacity>
        ))}

      </View>
      </SafeAreaView>
    </ScrollView>
    
  );
}


{/**stiller */}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "montserrat-bold",
    marginLeft: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#252836",
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },

  /**
   * activeCard -> ilk filme mavi border verir.
   */
  activeCard: {
    borderWidth: 1,
    borderColor: "#3D56F0",
  },

  poster: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  category: {
    color: "#9FA5C0",
    fontSize: 10,
    marginBottom: 4,
    fontFamily: "montserrat-regular",
  },

  title: {
    color: "white",
    fontSize: 14,
    marginBottom: 6,
    fontFamily: "montserrat-regular",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    color: "#9FA5C0",
    fontSize: 12,
    marginLeft: 6,
    fontFamily: "montserrat-regular",
  },

  progressIcon: {
    marginLeft: 10,
  },
});