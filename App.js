/**
 * App.js
 *
 * - Redux Provider
 * - PersistGate (state kalıcılığı)
 * - NavigationContainer
 * - Bottom Tabs
 * - Stack Navigators
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native-safe-area-context";

import { store, persistor } from "./store/store";

import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import DownloadScreen from "./components/DownloadScreen";
import ProfileScreen from "./components/ProfileScreen";
import MovieDetail from "./components/MovieDetail";
import FilmDetail from "./components/FilmDetail";
import Wishlist from "./components/Wishlist";
import FavoriteDetail from "./components/FavoriteDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Stack ortak ayarları
 */
const /*sabit değişken*/ stackOptions = {
  headerShown: false,
  animation: "fade",
  contentStyle: { backgroundColor: "#1F1D2B" },
};

/* -------------------- HOME STACK -------------------- */

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen
        name="FavoriteDetail"
        component={FavoriteDetail}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}

/* -------------------- SEARCH STACK -------------------- */

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}

/* -------------------- DOWNLOAD STACK -------------------- */

function DownloadStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
      <Stack.Screen
        name="FilmDetail"
        component={FilmDetail}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}

/* -------------------- PROFILE STACK -------------------- */

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

/**
 * Custom Theme
 */
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#1F1D2B",
    card: "#1F1D2B",
    text: "#fff",
    primary: "#00C2FF",
    border: "transparent",
    notification: "#00C2FF",
  },
};

/* -------------------- APP ROOT -------------------- */

export default function App() {
  return (
    /**
     * Provider:
     * Redux store tüm uygulamaya verilir
     */
    <Provider store={store}>

      {/**
       * PersistGate:
       * AsyncStorage'dan state yüklenene kadar bekler
       */}

      <PersistGate loading={null} persistor={persistor}>

        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(route.name, focused),
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Search" component={SearchStack} />
              <Tab.Screen name="Download" component={DownloadStack} />
              <Tab.Screen name="Profile" component={ProfileStack} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>

      </PersistGate>
    </Provider>
  );
}

/**
 * Tab Icon Render Fonksiyonu
 */
function renderTabIcon(routeName, focused) {
  let iconName = "";
  let label = "";

  if (routeName === "Home") {
    iconName = "home";
    label = "Home";
  } else if (routeName === "Search") {
    iconName = "search";
    label = "Search";
  } else if (routeName === "Download") {
    iconName = "download";
    label = "Download";
  } else if (routeName === "Profile") {
    iconName = "person";
    label = "Profile";
  }

  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <Ionicons
        name={iconName}
        size={25}
        color={focused ? "#00C2FF" : "gray"}
      />
      {focused && (
        <Text style={styles.tabLabel}>{label}</Text>
      )}
    </View>
  );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },
  tabBar: {
    backgroundColor: "#1F1D2B",
    borderTopWidth: 0,
    height: 65,
    paddingTop: 10,
    paddingHorizontal: 45,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 100,
    height: 38,
  },
  tabItemActive: {
    backgroundColor: "#252836",
  },
  tabLabel: {
    color: "#00C2FF",
    marginLeft: 2,
    fontSize: 15,
    fontFamily: "montserrat-regular",
  },
});