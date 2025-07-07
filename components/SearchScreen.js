import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, FlatList, ScrollView, Image, 
  SafeAreaView, TouchableOpacity, TextInput, Dimensions 
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const WIDTH = Dimensions.get("window").width;

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [todayMovie, setTodayMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const categories = ["All", "Comedy", "Animation", "Dokumentary"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchMovie("spiderman").then((res) => {
      if (res && res.Response === "True") {
        setTodayMovie(res.Search[0]);
      }
    });
    fetchMovie("life").then((res) => {
      if (res && res.Response === "True") {
        setRecommendations(res.Search.slice(0, 5));
      }
    });
  }, []);

  const fetchMovie = async (filmName) => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#999" />
          <TextInput
            placeholder="Type title,categories,years,etc"
            placeholderTextColor={"#999"}
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Today */}
        <Text style={styles.sectionTitle}>Today</Text>
        {todayMovie && (
          <View style={styles.todayCard}>
            <Image
              source={{ uri: todayMovie.Poster }}
              style={styles.todayImage}
            />
            <View style={styles.todayInfo}>
              <Text style={styles.todayTitle}>
                {todayMovie.Title.length > 20
                  ? todayMovie.Title.slice(0, 20) + ".."
                  : todayMovie.Title}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="calendar"
                  size={16}
                  color="#9FA5C0"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.movieDetails}>2021</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="time"
                  size={16}
                  color="#9FA5C0"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.movieDetails}>148 Minutes</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="film"
                  size={16}
                  color="#9FA5C0"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.movieDetails}>Action | Movie</Text>
              </View>
            </View>

            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>

            <BlurView intensity={40} tint="light" style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ 4.5</Text>
            </BlurView>
          </View>
        )}

        {/* Recommend For You */}
        <View style={styles.recommendRow}>
          <Text style={styles.sectionTitle}>Recommend For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recommendations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.recommendCard}>
              <Image source={{ uri: item.Poster }} style={styles.recommendImage} />
              <Text style={styles.recommendTitle}>
                {item.Title.length > 15
                  ? item.Title.slice(0, 15) + ".."
                  : item.Title}
              </Text>
              <Text style={styles.recommendGenre}>Action</Text>
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
    padding: 16,
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
    color: "#696974",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "montserrat-regular",
  },
  movieGenre: {
    color: "#00C2FF",
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
    fontFamily: "montserrat-regular",
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
