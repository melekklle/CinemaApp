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
  return Font.loadAsync({
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
};


export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [allData, setAllData] = useState({ Search: [] });
  const [popular, setPopular] = useState({ Search: [] });
  const [trending, setTrending] = useState({ Search: [] });

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const categories = ["All", "Comedy", "Animation", "Dokumentary", "Action", "Drama"];


  useEffect(() => {
    fetchFonts().then(() => setFontLoaded(true));

    fetchMovies("Avengers").then((res) => {
      if (res?.Response === "True") setAllData(res);
    });

    fetchMovies("Batman").then((res) => {
      if (res?.Response === "True") setPopular(res);
    });

    fetchMovies("Spiderman").then((res) => {
      if (res?.Response === "True") setTrending(res);
    });
  }, []);


  const fetchMovies = async (filmName) => {
    const url = `https://movie-database-alternative.p.rapidapi.com/?s=${filmName}&r=json&page=1`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "06f4e582b0msh1e7308013f2fc09p17a14bjsnb865cf6ef178",
        "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (error) {
      console.error("API ERROR:", error);
      return null;
    }
  };


  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(offsetX / WIDTH));
  };

  const isFavorite = (movie) =>
    favorites.some((item) => item.imdbID === movie.imdbID);

  if (!fontLoaded) return <Text>Loading...</Text>;


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Profile */}
      <View style={styles.profile}>
        <Image source={require("../assets/Image.png")} style={styles.profilePic} />
        <View style={styles.profileText}>
          <Text style={styles.header}>Hello, Smith</Text>
          <Text style={styles.header2}>Let's stream your favorite movie</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Wishlist", { movie: popular.Search[0] })}
          style={styles.heartWrapper}
        >
          <Image source={require("../assets/heart.png")} style={styles.heart} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.containerView}>
        <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
          <Feather name="search" size={20} color="#9FA5C0" />
          <TextInput
            style={styles.input}
            placeholder="Search a title.."
            placeholderTextColor="#9FA5C0"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => setClicked(true)}
          />
          <Ionicons name="settings" size={20} color="#9FA5C0" style={{ marginLeft: -55 }} />
          <Text style={styles.or}>|</Text>
        </View>
      </View>

      <StatusBar barStyle="light" />

      <ScrollView style={styles.container}>

      {/*bannerkısmı*/ }
        <FlatList
          data={allData.Search}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => `banner-${item.imdbID}`}
          renderItem={({ item }) => (
            <View style={styles.bannerWrapper}>
              <View style={styles.bannerItem}>
                <Image
                  source={{
                    uri:
                      item.Poster !== "N/A"
                        ? item.Poster
                        : "https://via.placeholder.com/300",
                  }}
                  style={styles.bannerImage}
                />
                <TouchableOpacity
                  onPress={() => dispatch(toggleFavorite(item))}
                  style={styles.bannerHeart}
                >
                  <Ionicons
                    name={isFavorite(item) ? "heart" : "heart-outline"}
                    size={25}
                    color="red"
                  />
                </TouchableOpacity>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>{item.Title}</Text>
                  <Text style={styles.bannerDate}>On {item.Year}</Text>
                </View>
              </View>
            </View>
          )}
        />

        {/*dots noktalar*/}
        <View style={styles.dotsContainer}>
          {allData.Search.map((item, index) => (
            <View
              key={`dot-${item.imdbID}`}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/*popüler kısmı */}
        <Text style={styles.sectionTitle}>Popular</Text>
        <FlatList
          data={popular.Search}
          horizontal
          keyExtractor={(item) => `popular-${item.imdbID}`}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <TouchableOpacity
                style={styles.cardHeart}
                onPress={() => dispatch(toggleFavorite(item))}
              >
                <Ionicons
                  name={isFavorite(item) ? "heart" : "heart-outline"}
                  size={22}
                  color="red"
                />
              </TouchableOpacity>
              <Text style={styles.title}>{item.Title}</Text>
            </View>
          )}
        />

        {/*trend kısmı */}
        <Text style={styles.sectionTitle}>Trending</Text>
        <FlatList
          data={trending.Search}
          horizontal
          keyExtractor={(item) => `trending-${item.imdbID}`}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <TouchableOpacity
                style={styles.cardHeart}
                onPress={() => dispatch(toggleFavorite(item))}
              >
                <Ionicons
                  name={isFavorite(item) ? "heart" : "heart-outline"}
                  size={22}
                  color="red"
                />
              </TouchableOpacity>
              <Text style={styles.title}>{item.Title}</Text>
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
    flex: 1,
     backgroundColor: "#1F1D2B"
     },
  container: {
     flex: 1, 
     backgroundColor: "#1F1D2B",
      padding: 16
     },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#00C2FF",
    width: 12,
    height: 12,
  },

  bannerWrapper: {
    width: 400,
    alignItems: "center",
  },

  bannerItem: {
    width: WIDTH - 80,
    backgroundColor: "#252836",
    borderRadius: 16,
  },

  bannerImage: {
    width: "100%",
    aspectRatio: 300 / 445,
    borderRadius: 16,
  },

  bannerHeart: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  bannerTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  bannerTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "montserrat-bold",
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
    marginVertical: 16,
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
    marginRight: 15,
  },

  heart: {
    width: 20,
    height: 20,
    tintColor: "red",
  },

  heartWrapper: {
    backgroundColor: "#252836",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
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