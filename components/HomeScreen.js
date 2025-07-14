import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView, Image, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";

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
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  const categories = ["All", "Comedy", "Animation", "Dokumentary", "Action", "Drama"];

  useEffect(() => {
    fetchFonts()
      .then(() => setFontLoaded(true))
      .catch(console.warn);

    fetchMovies("Avengers").then((res) => {
      if (res && res.Response === "True") {
        setAllData(res);
      }
    });
    fetchMovies("Batman").then((res) => {
      if (res && res.Response === "True") {
        setPopular(res);
      }
    });
    fetchMovies("Spiderman").then((res) => {
      if (res && res.Response === "True") {
        setTrending(res);
      }
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
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / WIDTH);
    setActiveIndex(newIndex);
  };

  if (!fontLoaded) {
    return <AppLoading />;
  }

  const isFavorite = (movie) =>
    favorites.some(item => item.imdbID === movie.imdbID);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <Image source={require("../assets/Image.png")} style={styles.profilePic} />
          <View style={styles.profileText}>
            <Text style={styles.header}>Hello, Smith</Text>
            <Text style={styles.header2}>Let's stream your favorite movie</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Wishlist")}
            style={styles.heartWrapper}
          >
            <Ionicons name="heart" size={20} color="red" />
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

        {/* Banner FlatList */}
        <FlatList
          data={allData.Search}
          keyExtractor={(item) => item.imdbID}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToAlignment="center"
          snapToInterval={WIDTH}
          decelerationRate="fast"
          bounces={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.bannerWrapper}>
              <View style={styles.bannerItem}>
                <Image source={{ uri: item.Poster }} style={styles.bannerImage} />
                <TouchableOpacity
                  onPress={() => dispatch(toggleFavorite(item))}
                  style={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <Ionicons
                    name={isFavorite(item) ? "heart" : "heart-outline"}
                    size={24}
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

        <View style={styles.dotsContainer}>
          {allData.Search.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// styles burada kalacak...
