import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView, Image, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Profile */}
        <View style={styles.profile}>
          <Image source={require("../assets/Image.png")} style={styles.profilePic} />
          <View style={styles.profileText}>
            <Text style={styles.header}>Hello, Smith</Text>
            <Text style={styles.header2}>Let's stream your favorite movie</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Wishlist", {movie: popular.Search[0]})}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Wishlist", { movie: item })}
              style={styles.bannerWrapper}
            >
              <View style={styles.bannerItem}>
                <Image source={{ uri: item.Poster }} style={styles.bannerImage} />
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>{item.Title}</Text>
                  <Text style={styles.bannerDate}>On {item.Year}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* dots */}
        <View style={styles.dotsContainer}>
          {allData.Search.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* Categories */}
        <Text style={styles.categori}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ gap: 10, marginBottom: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Popular movies */}
        <Text style={styles.sectionTitle}>Popular</Text>
        <FlatList
          data={popular.Search}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={{ gap: 10, marginBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Wishlist", { movie: item })}
              style={styles.card}
            >
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <Text style={styles.title}>{item.Title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Trending movies */}
        <Text style={styles.sectionTitle}>Trending</Text>
        <FlatList
          data={trending.Search}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={{ gap: 10, marginBottom: 30 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Wishlist", { movie: item })}
              style={styles.card}
            >
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <Text style={styles.title}>{item.Title}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  profile: { 
    flexDirection: "row",
     alignItems: "center",
      marginBottom: 20
     },
  profilePic: { 
    width: 50,
     height: 50,
      borderRadius: 25,
       marginRight: 15
       },
  heart: {
     width: 20, 
     height: 20,
      tintColor: "red" 
    },
  heartWrapper: { 
    backgroundColor: "#252836",
     width: 35,
      height: 35, 
      borderRadius: 17.5, 
      justifyContent: "center",
       alignItems: "center" 
      },
  profileText: {
     flexDirection: "column",
      flex: 1 
    },
  header: {
     color: "white", 
     fontSize: 20,
      fontFamily: "montserrat-bold" 
    },
  header2: {
     color: "#92929D", 
     fontSize: 15, 
     fontFamily: "montserrat-regular"
     },
  containerView: {
     marginTop: 10, 
     marginBottom: 20, 
     justifyContent: "flex-start",
      alignItems: "center", 
      flexDirection: "row", 
      width: "100%" 
    },
  searchBar__unclicked: {
     padding: 10,
      flexDirection: "row",
       width: "100%", 
       backgroundColor: "#252836",
        borderRadius: 15, 
        alignItems: "center" 
      },
  searchBar__clicked: {
     padding: 10, 
     flexDirection: "row",
      width: "100%", 
      backgroundColor: "#252836",
       borderRadius: 15,
        alignItems: "center", 
        justifyContent: "space-evenly"
       },
  input: {
     fontSize: 15,
      color: "#FFFFFF",
       marginLeft: 10, 
       width: "100%",
        fontFamily: "montserrat-regular"
       },
  or: {
     marginLeft: -30,
      color: "#9FA5C0", 
      fontSize: 25,
       height: 30 
      },
  bannerWrapper: {
     width: WIDTH,
      justifyContent: "center",
       alignItems: "center" 
      },
  bannerItem: { 
    width: WIDTH - 80, 
    backgroundColor: "#252836", 
    borderRadius: 16 
  },
  bannerImage: {
    width: "100%",
     aspectRatio: 300 / 445,
      borderRadius: 16
     },
  bannerTextContainer: {
     position: "absolute",
      bottom: 20, 
      left: 20, 
      right: 20
     },
  bannerTitle: { 
    color: "white", 
    fontSize: 18, 
    fontFamily: "montserrat-bold"
   },
  bannerDate: {
     color: "white", 
     fontSize: 14,
      fontFamily: "montserrat-regular",
      marginTop: 4 
    },
  dotsContainer: {
     flexDirection: "row", 
     justifyContent: "center",
      marginTop: 10
     },
  dot: { 
    width: 10,
     height: 10, 
     borderRadius: 5,
      backgroundColor: "#444",
       marginHorizontal: 5 
      },
  activeDot: {
     backgroundColor: "#00C2FF",
      width: 12,
       height: 12 
      },
  categori: { 
    fontSize: 25, 
    color: "white", 
    fontFamily: "montserrat-bold",
     alignSelf: "flex-start",
      marginTop: 10, 
      marginBottom: 10 
    },
  categoryButton: { 
    paddingHorizontal: 20,
     paddingVertical: 8, 
     backgroundColor: "#252836",
      borderRadius: 20 
    },
  categoryButtonActive: {
     backgroundColor: "#00C2FF" 
    },
  categoryText: {
     fontSize: 14,
      fontFamily: "montserrat-regular",
       color: "white"
       },
  categoryTextActive: {
     color: "#1F1D2B"
     },
  sectionTitle: { 
    color: "white",
     fontSize: 18,
      marginVertical: 16,
       fontFamily: "montserrat-bold"
       },
  card: { 
    width: 120,
     backgroundColor: "#252836",
      borderRadius: 12 
    },
  image: {
     width: 120,
      height: 180,
       borderRadius: 10
      },
  title: {
     color: "white", 
     marginTop: 5,
      fontSize: 12,
       fontFamily: "montserrat-bold" 
      },
});
