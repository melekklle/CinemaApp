/**
 * App.js
 *
 * - Redux Provider // Redux store'u tüm uygulamaya sağlar
 * - PersistGate (state kalıcılığı) // AsyncStorage'dan state yüklenene kadar bekler
 * - NavigationContainer // Navigasyon yapısını kapsar
 * - Bottom Tabs // Alt sekme navigasyonu
 * - Stack Navigators // Her sekme için ekran yığını
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux"; // Redux provider
import { PersistGate } from "redux-persist/integration/react"; // PersistGate
import { SafeAreaView } from "react-native-safe-area-context";

import { store, persistor } from "./store/store"; // store ve persistor import

import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import DownloadScreen from "./components/DownloadScreen";
import ProfileScreen from "./components/ProfileScreen";
import MovieDetail from "./components/MovieDetail";
import FilmDetail from "./components/FilmDetail";
import Wishlist from "./components/Wishlist";
import FavoriteDetail from "./components/FavoriteDetail";

const Tab = createBottomTabNavigator(); // bottom tab navigator alttaki tıklanabilir butonlar  örn home download
const Stack = createNativeStackNavigator(); // Stack navigator 
// bir sekme veya ekran yığını (stack) oluşturur ve ekranlar arasında ileri/geri geçişleri animasyonları ve modal gibi geçişleri yönetir

const /*sabit değişken*/ stackOptions = {
  headerShown: false, // header gizli
  animation: "fade", // ekran geçiş animasyonu fade
  contentStyle: { backgroundColor: "#1F1D2B" }, // ekran arka planı
};

function HomeStack() {
  // HomeStack adında bir fonksiyon tanımlanıyor
  // bu fonksiyon Home sekmesi için stack navigasyonu oluşturacak

  return (
    <Stack.Navigator screenOptions={stackOptions}>
    {/* Stack.Navigator: bu bir stack navigation başlatır
    // screenOptions={stackOptions}: her ekran için ortak ayarlar (header gizle animasyon arka plan) uygulanır*/}

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
     {/* HomeScreen stack içinde tanımlanıyor
      // name: ekranın route adı
      // component: hangi component render edilecek (HomeScreen)*/}

      <Stack.Screen name="Wishlist" component={Wishlist} />
      {/* Wishlist ekranı stack içine ekleniyor
      // favoriler sayfası için*/}

      <Stack.Screen
        name="FavoriteDetail"
        component={FavoriteDetail}
        options={{ presentation: "fullScreenModal" }}
        // FavoriteDetail ekranı stack içinde tanımlanıyor
        // options: ekrana özel ayarlar
        // presentation: "fullScreenModal" ekran modal gibi üstten açılır tam ekran gösterilir
      />
    </Stack.Navigator>
  );
}
function SearchStack() {
  // SearchStack adında bir fonksiyon tanımlanıyor
  // bu fonksiyon Search sekmesi için stack navigasyonu oluşturacak

  return (
    <Stack.Navigator screenOptions={stackOptions}>
      {/* Stack.Navigator: stack navigation başlatır
          screenOptions={stackOptions}: tüm ekranlara ortak ayarlar uygulanır (header gizle animasyon, arka plan) */}

      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      {/* SearchScreen stack içinde tanımlanıyor
          name: ekranın route adı
          component: hangi component render edilecek (SearchScreen) */}

      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ presentation: "fullScreenModal" }}
      />
       {/* MovieDetail ekranı stack içinde tanımlanıyor
          options: ekrana özel ayarlar
          presentation: "fullScreenModal"  ekran modal gibi üstten açılır tam ekran gösterilir */}
    </Stack.Navigator>
    
  );
}
function DownloadStack() {
  // DownloadStack adında bir fonksiyon tanımlanıyor
  // bu fonksiyon Download sekmesi için stack navigasyonu oluşturacak

  return (
    <Stack.Navigator screenOptions={stackOptions}>
   {/* Stack.Navigator: stack navigation başlatır
    // screenOptions={stackOptions}: tüm ekranlara ortak ayarlar uygulanır (header gizle animasyon arka plan rengi)*/}

      <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
      {/* DownloadScreen stack içinde tanımlanıyor
      // name: ekranın route adı
      // component: hangi component render edilecek (DownloadScreen)*/}

      <Stack.Screen
        name="FilmDetail"
        component={FilmDetail}
        options={{ presentation: "fullScreenModal" }}
      />
      {/* FilmDetail ekranı stack içinde tanımlanıyor
        // options: ekrana özel ayarlar
        // presentation: "fullScreenModal"  ekran modal gibi üstten açılır tam ekran gösterilir*/}

      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ presentation: "fullScreenModal" }}
      />
        {/* MovieDetail ekranı stack içinde tanımlanıyor
        // options: ekran modal gibi açılır ve tam ekran gösterilir*/}
    </Stack.Navigator>
  );
}


function ProfileStack() {
  // ProfileStack adında bir fonksiyon tanımlanıyor
  // bu fonksiyon Profile sekmesi için stack navigasyonu oluşturacak

  return (
    <Stack.Navigator screenOptions={stackOptions}>
   {/*Stack.Navigator: stack navigation başlatır
    // screenOptions={stackOptions}: tüm stack ekranlarında ortak ayarlar uygulanır
    // Örneğin: header gizle animasyon arka plan rengi*/}

      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
     {/* ProfileScreen stack içinde tanımlanıyor
      // name: ekranın route adı
      // component: hangi component render edilecek (ProfileScreen)*/}
    </Stack.Navigator>
  );
}


const MyTheme = {
  ...DefaultTheme, // DefaultTheme içindeki tüm ayarları al ve MyTheme içine kopyala
  colors: {
    ...DefaultTheme.colors, // DefaultTheme'deki renkleri al ve üzerine kendi renklerimizi ekle
    background: "#1F1D2B", // uygulamanın genel arka plan rengi
    card: "#1F1D2B", // header veya kart arka plan rengi
    text: "#fff", // tüm metinlerin rengi
    primary: "#00C2FF", // uygulamada vurgu ve ana renk
    border: "transparent", // kenarlık rengi şeffaf
    notification: "#00C2FF", // bildirim renkleri
  },
};


export default function App() { // App bileşeni, uygulamanın root componenti
  return (
    /**
     * Provider:Redux store'u tüm uygulamaya verir böylece her bileşen store'a erişebilir*
     */
    <Provider store={store}>

      {/**
       * PersistGate: AsyncStorage'dan kaydedilen state yüklenene kadar bekler*
       */}
      <PersistGate loading={null} persistor={persistor}>

        <SafeAreaView style={styles.safeArea}> {/* ekranın güvenli alanını kapsar üstteki çentik vs boşluk bırakır */}
          <NavigationContainer theme={MyTheme}> {/* react navigation container MyTheme ile özel tema uygulanır */}
            <Tab.Navigator
              screenOptions={({ route }) => ({ // her tab ekranı için genel ayarlar
                headerShown: false, // tab ekranlarının header'ı gizlenir
                tabBarShowLabel: false, // tab altında yazı gösterilmez
                tabBarStyle: styles.tabBar, // tab bar stil ayarları
                tabBarIcon: ({ focused }) => // her tab için ikon render fonksiyonu
                  renderTabIcon(route.name, focused), 
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} /> {/* Home tab */}
              <Tab.Screen name="Search" component={SearchStack} /> {/* Search tab */}
              <Tab.Screen name="Download" component={DownloadStack} /> {/* Download tab */}
              <Tab.Screen name="Profile" component={ProfileStack} /> {/* Profile tab */}
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>

      </PersistGate>
    </Provider>
  );
}

function renderTabIcon(routeName, focused) {
  // iconName ve label değişkenlerini tanımlıyoruz
  let iconName = ""; // gösterilecek ikonun adı (örn: "home", "search")
  let label = "";    // tab altında gösterilecek yazı

  // Hangi tab aktifse ona göre ikon ve label belirlenir
  if (routeName === "Home") {
    iconName = "home"; // eğer sekme adı "Home" ise ikon "home" olur
    label = "Home";    // etiket (yazı) da "Home" olur
  } else if (routeName === "Search") {
    iconName = "search"; // sekme "Search" ise ikon "search" olur
    label = "Search";    // etiket "Search" olur
  } else if (routeName === "Download") {
    iconName = "download"; // sekme "Download" ise ikon "download" olur
    label = "Download";    // etiket "Download" olur
  } else if (routeName === "Profile") {
    iconName = "person"; // sekme "Profile" ise ikon "person" olur
    label = "Profile";   // etiket "Profile" olur
  } // if-else bloğu burada biter, fazladan kapatma yok

  // Render kısmı
  return (
    <View
      style={[
        styles.tabItem,            // tab kapsayıcısı için genel stil
        focused && styles.tabItemActive, // eğer tab seçiliyse aktif stil uygulanır
      ]}
    >
      <Ionicons
        name={iconName}           // gösterilecek ikon adı
        size={25}                 // ikon boyutu
        color={focused ? "#00C2FF" : "gray"} // seçili tab mavi, diğerleri gri
      />
      {focused && (
        // eğer tab seçili ise label göster
        <Text style={styles.tabLabel}>{label}</Text> // tab ismi, örn: "Home"
      )}
    </View>
  );
}
/**
 * Styles
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // ekranın tamamını kaplar
    backgroundColor: "#1F1D2B", // arka plan rengi
  },
  tabBar: {
    backgroundColor: "#1F1D2B",
    borderTopWidth: 0, // üst çizgi yok
    height: 65, // tab bar yüksekliği
    paddingTop: 10, // üst padding
    paddingHorizontal: 45, // yatay padding
  },
  tabItem: {
    flexDirection: "row", // ikon ve yazı yan yana
    alignItems: "center", // dikey ortala
    justifyContent: "center", // yatay ortala
    borderRadius: 20, // köşe yuvarlaklığı
    width: 100, // genişlik
    height: 38, // yükseklik
  },
  tabItemActive: {
    backgroundColor: "#252836", // aktif tab arka plan
  },
  tabLabel: {
    color: "#00C2FF",
    marginLeft: 2, // ikon ve yazı arası boşluk
    fontSize: 15,
    fontFamily: "montserrat-regular", // yazı fontu
  },
});