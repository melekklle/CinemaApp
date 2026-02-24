/**
 * SearchScreen
 *
 * Bu ekran:
 * - Kullanıcıdan arama inputu alır
 * - Kategori seçimi sağlar
 * - "Today" filmi gösterir
 * - Önerilen filmleri HomeSliderWidget ile listeler
 * - API’den veri çeker
 */

import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,TextInput,Dimensions} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import HomeSliderWidget from "../widget/HomeSliderWidget";
import { SafeAreaView } from "react-native-safe-area-context";

const WIDTH = Dimensions.get("window").width;
//telefon ekranının genişliğini alıp WIDTH değişkenine kaydeder (ekran boyutuna göre tasarım yapmak için kullanılır)
export default function SearchScreen() {

  /**
   * Arama input state
   */
  const [searchText, setSearchText] = useState("");

  /**
   * Today filmi state
   */
  const [todayMovie, setTodayMovie] = useState(null);

  /**
   * Önerilen filmler state
   */
  const [recommendations, setRecommendations] = useState([]);

  /**
   * Seçili kategori state
   */
  const [selectedCategory, setSelectedCategory] = useState("All");

  /**
   * Kategori listesi
   */
  const categories = ["All", "Comedy", "Animation", "Dokumentary"];

  const navigation = useNavigation();
  //ekranlar arası geçiş 
  /**
   * useEffect:
   * Component mount olduğunda 2 API çağrısı yapar.
   */
  useEffect(() => {

    /**
     * Today filmi için veri çekilir
     */
    fetchMovie("spiderman").then((res) => { // spiderman için apiden veri ister 
      if (res && res.Response === "True") { //Veri gerçekten geldiyse ve başarılıysa çalışır
    //res var mı kontrol eder
     //api  başarı mesajı gönderdi mi kontrol eder
        setTodayMovie(res.Search[0]); //gelen film listesindeki ilk filmi alıp state'e kaydeder 0 ilk film 
      }
    });

    /**
     * Recommendation için veri çekilir
     */
    fetchMovie("life").then((res) => {//life filmi için api den veri ister veri gelince res içine koyar
      if (res && res.Response === "True") { //veri geldiyse ve api başarılı cevap verdiyse çalışır
        setRecommendations(res.Search.slice(0, 5));//gelen film listesinden ilk 5 filmi alır ve recommendations state'ine kaydeder.
      }
    });

  }, []);

  /**
   * fetchMovie:
   * RapidAPI üzerinden film verisi çeker.
   */
  const fetchMovie = async (filmName) => {//Film verisi çekmek için fonksiyon oluşturuyor async internetten veri bekleyecek demek

    const url = `https://movie-database-alternative.p.rapidapi.com/?s=${filmName}&r=json&page=1`;

    const options = {
      method: "GET",//veri çekmek istiyoruz o yüzden get 
      headers: {
        "x-rapidapi-key": "06f4e582b0msh1e7308013f2fc09p17a14bjsnb865cf6ef178",
        "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
      },
    };

    try {/**
     * try bu kodu dene hata olursa catch çalışsın
     */
      const response = await fetch(url, options);//fetch(url options)  api'ye istek gönderiyor
      const json = await response.json();// response.json()  gelen veriyi JSON formatına çeviriyor.await cevabı bekle sonra devam et
      return json;//apiden gelen veriyi fonksiyonu kullanan yere geri gönderir
    } catch (error) {
      console.error(error); //consolda error yazdırır
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        {/**
         * SEARCH BAR
         */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#92929D" /> {/**arama ikonu  */}
          <TextInput // kullanıcının yazı yazdığı alan 
            placeholder="Type title, categories, years, etc" // kullanıcı metin girmeden önce gözüken kısım
            placeholderTextColor={"#92929D"}
            style={styles.input}
            value={searchText} // kullanıcının yazdığı metni state'ten alır  searchText kullanıcın yazdığını tutan hafıza
            onChangeText={setSearchText} // kullanıcı yazdıkça state güncellenir
          />
        </View>

        {/**
         * kategori
         */}
        <ScrollView
          horizontal // kategoriler yan yana 
          // alttaki scroll barı kapatır
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categories} // kategori kısmının stilini ayarlar
        >
          {categories.map((cat) => ( //categories dizisindeki her öğe için bir buton oluşturur
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.activeCategoryButton, //eğer kategori seçiliyse özel stil uygular, seçilmemişse normal stil
              ]}
              onPress={() => setSelectedCategory(cat)} //kullanıcı tıkladığında seçilen kategori değişir ve ekran yenilenir
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText, //butonun içindeki yazı gösterilir seçiliyse yazının rengi değişir
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/**
         * today 
         */}
        <Text style={styles.sectionTitle}>Today</Text>
          {/**eğer todayMovie varsa kart gösterilir yoksa hiç bir şey göstermez */}
        {todayMovie && ( 
          <TouchableOpacity 
            style={styles.todayCard}
            onPress={() =>
              navigation.navigate("MovieDetail", { movie: todayMovie }) // karta tıklandığında moviedetail sayfasına gider
            }
          >
            <Image
              source={{ uri: todayMovie.Poster }} // resimleri apiden alır
              style={styles.todayImage}
            />

            {/**
             * Film Bilgileri
             */}
            <View style={styles.todayInfo}>

              <Text style={styles.todayTitle}>
                {todayMovie.Title.length > 20
                  ? todayMovie.Title.slice(0, 20) + ".." //eğer başlık 20 karakterden uzun ise sadece ilk 20 karakteri gösterir ve sonuna .. ekler kısa ise tamamını gösterir
                  : todayMovie.Title}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}> {/**içindeki ikon ve yazıyı yatay sıraya dizer ve dikeyde ortalar */}
                <Ionicons name="calendar" size={16} color="#9FA5C0" />
                <Text style={styles.movieDetails}>2021</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="time" size={16} color="#9FA5C0" />
                <Text style={styles.movieDetails}>148 Minutes</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="film" size={16} color="#9FA5C0" />
                <Text style={styles.movieDetails}>Action |</Text>
                <Text style={styles.movieDetailsM}> Movie</Text>
              </View>

            </View>

            {/**
             * Premium Badge
             */}
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>

            {/**
             * Rating Badge (Blur efekti)
             */}
            <BlurView intensity={40} tint="light" style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ 4.5</Text>
            </BlurView>

          </TouchableOpacity>
        )}

        <View style={styles.recommendRow}>
          <Text style={styles.sectionTitle}>Recommend For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

   
        <HomeSliderWidget 
          data={recommendations}
          title="Recommend For You"
          description={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },
  container: {
    padding: 16,
    backgroundColor:'#1F1D2B',
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252836",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    color: "white",
    flex: 1,
    fontFamily: "montserrat-regular",
  },
  categories: {
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#252836",
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: "#00C2FF",
  },
  categoryText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "montserrat-regular",
  },
  activeCategoryText: {
    color: "#1F1D2B",
    fontFamily: "montserrat-regular",
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "montserrat-bold",
  },
  todayCard: {
    backgroundColor: "#252836",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  todayImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
  },
  todayInfo: {
    flex: 1,
    marginLeft: 12,
  },
  todayTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "montserrat-bold",
  },
  movieDetails: {
    color: "#92929D",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "montserrat-regular",
  },
  movieDetailsM: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "montserrat-regular",
  },
  premiumBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF8700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  premiumText: {
    color: "white",
    fontSize: 12,
    fontFamily: "montserrat-regular",
  },
  ratingBadge: {
    position: "absolute",
    top: 15,
    left: 10,
    backgroundColor: "rgba(63, 63, 63, 0.48)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: "hidden",
  },
  ratingText: {
    color: "#FF8700",
    fontSize: 15,
    fontFamily: "montserrat-bold",
  },
  recommendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seeAll: {
    color: "#00C2FF",
    fontSize: 15,
    fontFamily: "montserrat-bold",
  },
  recommendCard: {
    backgroundColor: "#252836",
    width: 120,
    borderRadius: 12,
    marginRight: 16,
    paddingBottom: 10,
  },
  recommendImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recommendTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    paddingHorizontal: 6,
    fontFamily: "montserrat-regular",
  },
  recommendGenre: {
    color: "#696974",
    fontSize: 12,
    paddingHorizontal: 6,
    fontFamily: "montserrat-regular",
  },
});
