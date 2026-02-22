/**
 * HOME SCREEN
 */

import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,FlatList,Dimensions,ScrollView,Image,TouchableOpacity,TextInput,StatusBar,} from "react-native";

import * as Font from "expo-font";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoriteSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const WIDTH = Dimensions.get("window").width;



const fetchFonts = () => {
  return Font.loadAsync({/**exponun font paketi */
    "montserrat-regular"/**kullandığım font ismi */: require("../assets/fonts/Montserrat-Regular.ttf"),/**font dosya yolu  */
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
};


export default /*başka dosyaları import etmemi sağlar örn olarak import HomeScreen from './HomeScreen;'*/function HomeScreen(){
  /**HomeScreen adında bir component oluşturur.Component:Uygulamanın küçük, bağımsız, tekrar kullanılabilir parçası. 
   * Legoya benzetebiliriz küçük parçalardan büyük yapı elde edilmesi*/
  const [fontLoaded, setFontLoaded] = useState(false);
  /**useState react'e “ bu component’in bir hafızaya ihtiyacı var” dediğimiz yer.

component’in aklında tutacağı bilgi (state) buradan geliyor. 
başta false yazıyoruz çünkü fontlar henz yüklenmedi
yüklendiğinde react otomatik olarak (true) olarak günceller.*/

  const [activeIndex, setActiveIndex] = useState(0);
/** const : sabit değer. burası banner slider kısmı. hangi slider'ın aktif  olduğunu tutar.0'ın anlamı ilk hangi sliderdan başlayacağı anlamına gelir.
 * ilk başta activeIndex değeri 0 dır . 
 */
  const [allData, setAllData] = useState({ Search: [] });
  /**banner için gelen film verisi başlangıçta  [] yapıyoruz ki hata vermesin.
   * 
   */
  const [popular, setPopular] = useState({ Search: [] }); // başlangıçta [] boş 
  /**
   * popular component'in hafızasında tuttuğu bir veri. burada popüler şeyleri saklamak için kullanılıyor.
  başlangıçta { Search: [] }  yani içinde boş bir “Search” listesi var. 
  [] içi güncellenebilir [film1,film2,film3] olursa otomatik yeniden render eder.
   burdaki state popüler şeyleri tutan bir hafıza ilk başta boş bir liste var .
   API'den veri gelince setPopular ile liste dolar ve ekranda yenilenir.
  */
  const [trending, setTrending] = useState({ Search: [] });//başlangıçta { Search: [] } yani içinde boş bir “Search” listesi var henüz trend veri yok.
/**setTrending ile trending state'inin içindeki Search listesini güncelleyebiliyoruz.
 *  popülerde yaptığımız gibi [] içine Film1, Film2 gibi veriler koyarsak
 *  react component'i otomatik olarak yeniden render eder ve ekranda trend içerikler görünür.”
 */
  const [searchPhrase, setSearchPhrase] = useState(""); //başlangıçta boş çünkü metin yazılmadı.
  /**setSearchPhrase ile searchPhrase'in içindeki metni güncelleyebiliyoruz.
  örneğin kullanıcı arama kutusuna “film” yazarsa 
  react bunu görünce component'i otomatik olarak yeniden render eder ekranda artık arama kutusundaki metin güncellenmiş olur.
   * 
   */

  const [clicked, setClicked] = useState(false);
/**clicked component'in hafızasında tuttuğu tıklanma durumu.
başlangıçta false  yani henüz tıklanmadı
 * kullancıı tıkladığında react render eder ve (true) olarak güncellenir.
 */
  const navigation = useNavigation();
  //sayfalar arası geçişi sağlar 
  const dispatch = useDispatch();
  /**
   * favoriye ekle çıkar için kullanığım Redux satırı.
   */
  const favorites = useSelector((state) => state.favorites);
/**react reduxtan gelen bir hook. componentin hafızası yok  yani bir sayıyı ekranda gösteriyorum fakat kullanıcı sayıyı değiştirdiğinde 
 * react bunu hatırlamıyor ve ekrana basmıyor burda devreye hook giriyor ve componente hafıza ekliyor gibi düşünülebilir.
 * componente ekstra özellik verir.
 * favorideki filmlerin listelenmesini sağlar.
 */
  useEffect(() => {/**useEffect react hook'u, yani component açıldığında veya değişiklik olduğunda bir işlem yapmamızı sağlar. */
    fetchFonts().then(() => setFontLoaded(true));
/**
 * fetchFonts() expo font paketini yüklüyor.
.then(() => setFontLoaded(true)) fontlar yüklendiğinde fontLoaded state'i true oluyor.
 */
    fetchMovies("Avengers").then((res)/**veri gelince çalışır */ => {//apiden Avengers filmini çekiyor.
      if (res?.Response === "True")/**gelen veri doğru mu bunu kontrol eder */ setAllData(res);//banenr sliderın statini günceller.
    });

    fetchMovies("Batman").then((res) => {//apiden batman filmini çekiyor
      if (res?.Response === "True")/**gelen veri doğru mu diye kontrol eder */ setPopular(res);//populer statini kaydeder ve
      //populer listesini günceller
    });

    fetchMovies("Spiderman").then((res) => {//aynı mantık apiden spiderman filmini çeker
      if (res?.Response === "True") setTrending(res); //trend statine kaydeder ve trendk listesini günceller
    });
  }, []);


  const fetchMovies = async (filmName) => { //film ismi verince apiden o filmin verisini çeker 
    const url = `https://movie-database-alternative.p.rapidapi.com/?s=${filmName}&r=json&page=1`; 
    //api urlsi film name kısmına örn avengers yazarsa avenger film verilerini çeker.

    const options = {//apiye bağlanma kısmı 
      method: "GET",//veri çekmek istiyoruz o yüzden get 
      headers: {//headers api  anahtarı ve host bilgisi api'nin kim olduğunu kontrol etmesi için.
        "x-rapidapi-key": "06f4e582b0msh1e7308013f2fc09p17a14bjsnb865cf6ef178", //api anahtarı 
        "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
      },
    };

    try {/**
     * try bu kodu dene hata olursa catch çalışsın
     */
      const response = await fetch(url, options);//fetch(url options)  api'ye istek gönderiyor
      return await response.json();// response.json()  gelen veriyi JSON formatına çeviriyor.await cevabı bekle sonra devam et
    } catch (error) {//catch  hata olursa konsola yaz fonksiyon null döndür
      console.error("API ERROR:", error); // konsolda api error yazdırır
      return null;
    }
  };


  const handleScroll = (event) => {/**
   * handleScroll banner slider kaydırıldığında çalışan fonksiyon*/
    const offsetX = event.nativeEvent.contentOffset.x;//event.nativeEvent.contentOffset.x  
    // kullanıcı slider'ı yatay kaydırdığında ne kadar ilerlediğini verir (x koordinatı)
    setActiveIndex(Math.round(offsetX / WIDTH));//Math.round(offsetX / WIDTH)  
    // kaydırma miktarını kaçıncı slide olduğunu bulmak için kullanıyoruz
  //setActiveIndex(...) activeIndex state'ini güncelliyor  böylece dot'lar ve aktif slide doğru gösteriliyor
  };
  const isFavorite = (movie) =>/**isFavorite bir filmin favori listesinde olup olmadığını kontrol eden fonksiyon*/
    favorites.some((item) => item.imdbID === movie.imdbID);//item.imdbID === movie.imdbID  film ID'si eşleşiyorsa true döner
    //favorites.some(...)  favorites array'inde en az bir eleman eşleşiyor mu diye bakar
    //Bu film favori mi? sorusuna true/false döndürüyor 
  if (!fontLoaded) return <Text>Loading...</Text>;


  return (//return ekranda ne gösterileceğini döndürür
    /**SafeAreaView  telefonun çentik üst bar saat kısmı gibi alanlarına taşmaması için kullanılır */
    <SafeAreaView style={styles.safeArea}> 
      {/* Profile */}
      <View style={styles.profile}>
        {/**View react native de div gibi container */}
        <Image source={require("../assets/Image.png")} style={styles.profilePic} /> 
        {/**profil resimi bastırır. stil eklenir*/}
        <View style={styles.profileText}>{/**profilin yanındaki yazıların stili  */}
          <Text style={styles.header}>Hello, Smith</Text>
          <Text style={styles.header2}>Let's stream your favorite movie</Text>
        </View>
        <TouchableOpacity //tıklanabilir alan oluşturur buton gibi çalışır
          onPress={() =>
            navigation.navigate("Wishlist", { movie: popular.Search[0] })} //onPress  butona basıldığında çalışır
            // //navigation.navigate("Wishlist")  başka sayfaya gider"Wishlist"  gidilecek ekran adı
          //{ movie: popular.Search[0] }  o sayfaya veri gönderir
          //[0] ise ilk filmi alır.
          style={styles.heartWrapper}
        >
          <Image source={require("../assets/heart.png")} style={styles.heart} /> {/**kalp resmini alır ve stil eklenir. */}
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.containerView}> {/**arama kısmının çerçevesi */}
        <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}> {/**clicked state değişkeni (true / false)
      true searchBar__clicked style uygulanır
      false  searchBar__unclicked style uygulanır
      Input'a tıklanınca search bar görünümü değişir */}
          <Feather name="search" size={20} color="#9FA5C0" />{/**ikon kütüphanesi feather . ionicons da ikon için kullanılır */}
          <TextInput 
            style={styles.input}
            placeholder="Search a title.." // yazı yazılmadan önce gösterilen metin
            placeholderTextColor="#9FA5C0"
            value={searchPhrase}//searchPhrase kullanımı kullanıcı ne yazarsa state içinde tutulur.
            onChangeText={setSearchPhrase}//kullanıcı yazı yazdıkça çalışır
            // yazılan metni alır 
            // setSearchPhrase() ile state'i günceller
            onFocus={() => setClicked(true)}//Input'a tıklanınca çalışır
          />{/**kullanıcının yazı yazdığı alan */}
          <Ionicons name="settings" size={20} color="#9FA5C0" style={{ marginLeft: -55 }} />
          {/**ayarlar ikonu margin left ile sola kayar */}
          <Text style={styles.or}>|</Text>
        </View>
      </View>

      <StatusBar barStyle="light" />
          {/**telefonun üst barı beyaz renk olur saat pil vs. olduğu yer. */}
      <ScrollView style={styles.container}> {/**ekranı aşağıya kaydırılabilir yapar */}

      {/*bannerkısmı*/ }
        <FlatList //film listesini ekrana basar
        // Performanslı çalışır
        // API verisi göstermek için kullanılır
        // Netflix slider mantığı burada
          data={allData.Search} //satır 41 de yaptığım gibi apiden film verisi alır 
          horizontal //liste sağa ya da sola kayar
          pagingEnabled // her kaydırmada bir banner geçer yarım geçmez slider hissi verir
          onScroll={handleScroll} // kullanıcı kaydırdıkça çalışır hangi bannerda olduğunu hesaplar dots göstergesi için kullanılır.
          scrollEventThrottle={16} // scroll eventinin ne sıklıkla çalışıcağını belir 16 ise ms olarak akılığı belirtir.
          keyExtractor={(item) => `banner-${item.imdbID}`} // her filmin kendisine ait ID'si olduğu için ayırt etmek için kullanılır.
          // bu eleman kim 
          renderItem={({ item }) => ( //listedeki her elemanın ekranda nasıl görüneceğini söyleyen yer. item = o an ki film 
            //bu eleman ekranda nasıl gözüksün
            <View style={styles.bannerWrapper}> {/**banner stili */}
              <View style={styles.bannerItem}>{/**gösterilen filmin stili  */}
                <Image
                  source={{
                    uri:
                      item.Poster !== "N/A" /*eğer gösterilcek bir resim yoksa geçici resim koyar n/a dönerse image boş kalır*/ 
                        ? item.Poster
                        : "https://via.placeholder.com/300",/**geçici resim */
                  }}
                  style={styles.bannerImage}
                />
                <TouchableOpacity
                  onPress={() => dispatch(toggleFavorite(item))} // kullanıcı kalbe basar. toggleFavorite çalışır film favoriye eklenir ya da çıkarılır.
                  //dispatch reduxa komut gönderir bu filmi favoriye ekle diye toggleFavorite ise favorideyse çıkarır değilse ekler
                  style={styles.bannerHeart}
                >
                  <Ionicons
                    name={isFavorite(item) ? "heart" : "heart-outline"} // kalp ikonu film favorideyse içini doldur değilse içini boş bırak
                    //  ? : şartlı ifade if kısa hali 
                    size={25}
                    color="red"
                  />
                </TouchableOpacity>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>{item.Title}</Text> {/**apiden gelen film adı   */}
                  <Text style={styles.bannerDate}>On {item.Year}</Text>{/**apiden gelen film yılı   */}
                </View>
              </View>
            </View>
          )}
        />

        {/*dots noktalar*/}
        <View style={styles.dotsContainer}>
          {allData.Search.map((item, index) => ( // kaç film varsa ona göre nokta oluşturur.
            <View
              key={`dot-${item.imdbID}`} // her noktaya birbirinden farklı id verir . react için gerekli  
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot, // hangi slider aktifse ordaki noktanın rengi değişir
              ]}
            />
          ))}
        </View>

        {/*popüler kısmı */}
        <Text style={styles.sectionTitle}>Popular</Text> {/**ekrana popüler yazar */}
        <FlatList //apiden gelen popüler filmleri listeler
          data={popular.Search}
          horizontal // sağa sola kaydırır 
          keyExtractor={(item) => `popular-${item.imdbID}`} // her filme ayrı ayrı id verir 
          contentContainerStyle={{ gap: 10 }} //filmler arası boşluk 
          renderItem={({ item }) => ( //listedeki her film için bu tasarımı çiz 
            <View style={styles.card}> {/**her film için kart kutusu  */}
              <Image source={{ uri: item.Poster }} style={styles.image} /> {/**apiden gelen film afişi  item.poster = resim linki  */}
              <TouchableOpacity
                style={styles.cardHeart}
                onPress={() => dispatch(toggleFavorite(item))} // favoriye ekle çıkar kısmı 
              >
                <Ionicons
                  name={isFavorite(item) ? "heart" : "heart-outline"} // kalp ikonu  favoriyse içi dolu kırmızı değilse boş kalp 
                  size={22}
                  color="red"
                />
              </TouchableOpacity>
              <Text style={styles.title}>{item.Title}</Text> {/**filmin adını gösterir */}
            </View>
          )}
        />

        {/*trend kısmı */}
        <Text style={styles.sectionTitle}>Trending</Text>
        <FlatList
          data={trending.Search} //apiden trend filmleri alır 
          horizontal // sağa sola kaydırır 
          keyExtractor={(item) => `trending-${item.imdbID}`} // her trend filme özel id ekler 
          contentContainerStyle={{ gap: 10 }} // filmler arası boşluk 
          renderItem={({ item }) => ( 
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.image} /> {/**apiden gelen poster  */}
              <TouchableOpacity
                style={styles.cardHeart} //favoriye ekle çıkar 
                onPress={() => dispatch(toggleFavorite(item))}
              >
                <Ionicons
                  name={isFavorite(item) ? "heart" : "heart-outline"}
                  size={22}
                  color="red"
                />
              </TouchableOpacity>
              <Text style={styles.title}>{item.Title}</Text> {/**apiden gelen film adi  */}
            </View>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
      /*stiller */

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, // tüm ekranı kaplar 
     backgroundColor: "#1F1D2B" // arka plan rengi 
     },
  container: {
     flex: 1, 
     backgroundColor: "#1F1D2B",
      padding: 16 // içerik ile kenarlar arası boşluk 
     },

  dotsContainer: {
    flexDirection: "row", // içindeki kutuların yan yana mı yoksa alt alta mı dizileceğini belirler. row yatay column dikey 
    justifyContent: "center", //ana eksende nasıl hizalayacağını belirler sağ sol orta 
    marginTop: 10,//üst taraftan dış boşluk bırakır
    marginBottom: 10,//alt taraftan dış boşluk bırakır
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,//köşeleri yuvarlatır
    backgroundColor: "#444",
    marginHorizontal: 5,//sağdan ve soldan dış boşluk bırakır
  },

  activeDot: {
    backgroundColor: "#00C2FF",
    width: 12,
    height: 12,
  },

  bannerWrapper: {
    width: 400,
    alignItems: "center",//içindeki elemanları yan eksende hizalar sağ sol ortala gibi 
  },

  bannerItem: {
    width: WIDTH - 80,
    backgroundColor: "#252836",
    borderRadius: 16,
  },

  bannerImage: {
    width: "100%",
    aspectRatio: 300 / 445,//genişlik ve yükseklik oranını sabit tutar 
    borderRadius: 16,
  },

  bannerHeart: {
    position: "absolute",//elemanın konumlandırma türünü belirler absolute elemanı tamamen serbest bırakır istediğin yere koyarsın 
    //relative eleman yerinde durur sadece konumuna göre oynatılır
    top: 10,//elemanın üstten uzaklığını belirler
    right: 10,
  },

  bannerTextContainer: {
    position: "absolute",
    bottom: 20,//elemanın alttan uzaklığını belirler
    left: 20,
  },

  bannerTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "montserrat-bold", //yazı tipi 
  },

  bannerDate: {
    color: "white",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    marginTop: 4,
  },

  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginVertical: 16, //üstten ve alttan dış boşluk bırakır
    fontFamily: "montserrat-bold",
  },

  card: {
    width: 120,
    backgroundColor: "#252836",
    borderRadius: 12,
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },

  title: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    fontFamily: "montserrat-bold",
    left: 5,
  },

  cardHeart: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,//sağ taraftan dış boşluk bırakır
  },

  heart: {
    width: 20,
    height: 20,
    tintColor: "red", //resim veya ikonun rengini değiştirir
  
  },

  heartWrapper: {
    backgroundColor: "#252836",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center", //ana eksende nasıl hizalayacağını belirler sağ sol orta 
    alignItems: "center",
    right:10,
  },

  profileText: {
    flexDirection: "column",
    flex: 1,
  },

  header: {
    color: "white",
    fontSize: 20,
    fontFamily: "montserrat-bold",
  },

  header2: {
    color: "#92929D",
    fontSize: 15,
    fontFamily: "montserrat-regular",
  },

  input: {
    fontSize: 15,
    color: "#FFFFFF",
    marginLeft: 10,
    width: "100%",
    fontFamily: "montserrat-regular",
  },

  or: {
    marginLeft: -30,
    color: "#9FA5C0",
    fontSize: 25,
    height: 30,
  },

  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: 430,
    backgroundColor: "#252836",
    borderRadius: 15,
    alignItems: "center",
  },

  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#252836",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  containerView: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});