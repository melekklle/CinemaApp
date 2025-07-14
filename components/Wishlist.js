import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Wishlist() {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wishlist</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.Poster }} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>{item.Title}</Text>
              <TouchableOpacity onPress={() => dispatch(toggleFavorite(item))}>
                <Ionicons name="heart" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1D2B", padding: 16 },
  header: { color: "white", fontSize: 24, fontFamily: "montserrat-bold", marginBottom: 20 },
  card: { flexDirection: "row", backgroundColor: "#252836", borderRadius: 12, marginBottom: 10, padding: 10 },
  image: { width: 80, height: 120, borderRadius: 8 },
  title: { color: "white", fontSize: 16, fontFamily: "montserrat-bold" },
});
