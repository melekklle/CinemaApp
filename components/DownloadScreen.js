import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function DownloadScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [progress, setProgress] = useState(0.75);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://movie-database-alternative.p.rapidapi.com/?s=Batman&r=json&page=1`;
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
        setMovies(json.Search || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Download</Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        {movies.map((item, index) => (
          <TouchableOpacity 
            key={item.imdbID}
            onPress={() => navigation.navigate("FilmDetail", { movie: item })}
            style={[styles.card, index === 0 && styles.activeCard]}
          >
            <Image source={{ uri: item.Poster }} style={styles.poster} />

            <View style={styles.info}>
              <Text style={styles.category}>Action</Text>
              <Text style={styles.title}>{item.Title}</Text>
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

            {[0,4,6,8]. includes(index)&& (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171725",
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
