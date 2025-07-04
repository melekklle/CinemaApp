import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

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

  if (!fontLoaded) {
    return <AppLoading />;
  }

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / WIDTH);
    setActiveIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        <View style={styles.profile}>
          <Image
            source={require("../assets/Image.png")}
            style={styles.profilePic}
          />
          <View style={styles.profileText}>
            <Text style={styles.header}>Hello, Smith</Text>
            <Text style={styles.header2}>Let's stream your favorite movie</Text>
          </View>
          <TouchableOpacity style={styles.heartWrapper}>
            <Image
              source={require("../assets/heart.png")}
              style={styles.heart}
            />
          </TouchableOpacity>
        </View>


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
                <Image
                  source={{ uri: item.Poster }}
                  style={styles.bannerImage}
                />
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
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Popular</Text>
        <FlatList
          horizontal
          data={popular.Search}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <Text style={styles.title}>{item.Title}</Text>
            </View>
          )}
        />


        <Text style={styles.sectionTitle}>Trending</Text>
        <FlatList
          horizontal
          data={trending.Search}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <Text style={styles.title}>{item.Title}</Text>
            </View>
          )}
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
    flex: 1,
    backgroundColor: "#1F1D2B",
    padding: 16,
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

  bannerWrapper: {
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerItem: {
    width: WIDTH - 40,
    backgroundColor: "#252836",
    borderRadius: 16,
    overflow: 'visible',
  },
  bannerImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },
  bannerTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
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

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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

  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginVertical: 16,
    fontFamily: "montserrat-bold",
  },
  card: {
    width: 120,
    marginRight: 20,
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
    fontFamily: "montserrat-regular",
  },
});
