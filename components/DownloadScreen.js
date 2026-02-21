/**
 * DownloadScreen Component
 *
 * Bu ekran indirilen filmleri listelemek için oluşturulmuştur.
 * API üzerinden film verisi çekilir ve ScrollView içinde render edilir.
 * Navigation kullanılarak FilmDetail ekranına geçiş yapılır.
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function DownloadScreen({ navigation }) {

  /**
   * movies -> API’den gelen film verilerini tutar.
   * Local state kullanılmıştır çünkü bu veri sadece bu componentte kullanılıyor.
   */
  const [movies, setMovies] = useState([]);

  /**
   * progress -> indirme yüzdesini temsil eder.
   * 0 ile 1 arasında değer alır.
   */
  const [progress, setProgress] = useState(0.75);

  /**
   * useEffect -> Component mount olduğunda çalışır.
   * Dependency array boş olduğu için sadece 1 kere tetiklenir.
   */
  useEffect(() => {

    /**
     * fetchMovies -> RapidAPI üzerinden film verisi çeker.
     * async/await kullanılmıştır çünkü API çağrısı asenkron bir işlemdir.
     */
    const fetchMovies = async () => {

      const options = {
        method: "GET",
        headers: {
          /**
           * RapidAPI key header içinde gönderilir.
           * Güvenlik için normalde .env dosyasında tutulmalıdır.
           */
          "x-rapidapi-key": "API_KEY",
          "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
        },
      };

      try {
        /**
         * fetch -> HTTP isteği gönderir.
         * await -> işlem tamamlanana kadar bekler.
         */
        const response = await fetch(url, options);

        /**
         * JSON parse işlemi yapılır.
         */
        const json = await response.json();

        /**
         * Eğer json.Search varsa state'e aktarılır.
         * Yoksa boş array atanır.
         */
        setMovies(json.Search || []);

      } catch (error) {

        /**
         * Hata yakalama mekanizması.
         * API başarısız olursa uygulama çökmez.
         */
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();

  }, []); // <-- Dependency array boş → sadece ilk render’da çalışır


  return (

    /**
     * ScrollView kullanıldı çünkü liste scroll edilebilir.
     * contentContainerStyle alt boşluk eklemek için kullanılır.
     */
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

      {/* Header Bölümü */}
      <View style={styles.headerRow}>

        {/* Geri Butonu */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Download</Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>

        {/**
         * movies.map -> Array içindeki her filmi render eder.
         * Her item için unique key kullanılmıştır (imdbID).
         */}
        {movies.map((item, index) => (

          <TouchableOpacity
            key={item.imdbID}  // <-- unique key
            onPress={() => navigation.navigate("FilmDetail", { movie: item })}
            style={[styles.card, index === 0 && styles.activeCard]}
          >

            {/* Film Posteri */}
            <Image source={{ uri: item.Poster }} style={styles.poster} />

            {/* Film Bilgi Alanı */}
            <View style={styles.info}>

              <Text style={styles.category}>Action</Text>
              <Text style={styles.title}>{item.Title}</Text>

              {/**
               * Eğer ilk film ise progress bilgisi gösterilir.
               * Değilse sabit bilgi gösterilir.
               */}
              {index === 0 ? (
                <View style={styles.row}>
                  <Feather name="download" size={14} color="#9FA5C0" />
                  <Text style={styles.metaText}>1.25 of 1.78 GB</Text>
                  <Text style={styles.metaText}> | {Math.round(progress * 100)}%</Text>
                </View>
              ) : (
                <Text style={styles.metaText}>Movie | 1.78 GB</Text>
              )}

            </View>

            {/**
             * Eğer index belirli sayılardan biri ise
             * pause icon gösterilir.
             * includes() array içinde var mı kontrol eder.
             */}
            {[0,4,6,8].includes(index) && (
              <View style={styles.progressIcon}>
                <Feather name="pause-circle" size={36} color="white" />
              </View>
            )}

          </TouchableOpacity>
        ))}

      </View>
    </ScrollView>
  );
}


/**
 * StyleSheet performans için kullanılır.
 * Inline style yerine StyleSheet tercih edilir.
 */
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