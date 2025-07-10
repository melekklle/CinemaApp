import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MovieDetail() {
    const route = useRoute();
    const navigation = useNavigation();
    const { movie } = route.params;

    // Cast and Crew data
    const castData = [
        { id: '1', name: 'Dario Russo', role: 'Director', image: require("../assets/Image.png") },
        { id: '2', name: 'Dario Russo', role: 'Director and Writer', image: require("../assets/Image.png") },
        { id: '3', name: 'David Ashby', role: 'Writer', image: require("../assets/Image.png") },
        { id: '4', name: 'John Doe', role: 'Actor', image: require("../assets/Image.png") },
        { id: '5', name: 'Jane Doe', role: 'Actress', image: require("../assets/Image.png") },
    ];

    return (
        <Modal>
            <ScrollView style={styles.container}>
                <BlurView intensity={100} tint="systemUltraThinMaterialDark" style={styles.backgroundPoster}>
                                     <Image source={{uri:movie?.Poster}}
                                style={styles.backgroundPoster}
                                resizeMode="cover"></Image>
                                   </BlurView>
                              <LinearGradient colors={['transparent','rgba(31,29,43,0.8)', 'rgba(31,29,43,1)']} style={styles.backgroundLinear}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={"white"} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {movie.Title.length > 20 ? movie.Title.slice(0, 20) + ".." : movie.Title}
                    </Text>
                    <TouchableOpacity style={styles.heartWrapper}>
                        <Image source={require("../assets/heart.png")} style={styles.heart} />
                    </TouchableOpacity>
                </View>

                <View style={styles.posterContainer}>
                    <Image
                        source={{ uri: movie.Poster }}
                        style={styles.poster}
                        resizeMode='cover'
                    />
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Ionicons name="calendar" size={16} color="#9FA5C0" />
                        <Text style={styles.infoText}>{movie.Year}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="time" size={16} color="#9FA5C0" />
                        <Text style={styles.infoText}>148 Minutes</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="film" size={16} color="#9FA5C0" />
                        <Text style={styles.infoText}>Action</Text>
                    </View>
                </View>

                <View style={styles.ratingContainer}>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>★ 4.5</Text>
                    </View>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.playButton}>
                        <Ionicons name="play" size={20} color={"white"} />
                        <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="download" size={20} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="share" size={20} color="#12CDD9" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
                <View style={styles.storySection}>
                    <Text style={styles.storyTitle}>Story Line</Text>
                    <Text style={styles.storyText}>
                        For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk.
                    </Text>
                </View>
                <View style={styles.storySection}>
                    <Text style={styles.storyTitle}>Cast And Crew</Text>
                    <FlatList
                        data={castData}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10 }}
                        renderItem={({ item }) => (
                            <View style={styles.castItem}>
                                <Image source={item.image} style={styles.castImage} />
                                <View style={styles.castTextContainer}>
                                    <Text style={styles.header}>{item.name}</Text>
                                    <Text style={styles.header2}>{item.role}</Text>
                                </View>
                            </View>
                        )}
                    />
                 </View>
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1D2B',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'montserrat-bold',
    },
    posterContainer: {
        alignItems: 'center',
        marginBottom: 20,
        margin: 10,
        marginTop: 40,
    },
    poster: {
        width: 220,
        height: 320,
        borderRadius: 20,
    },
    backgroundPoster: {
     width: "100%",
    position: 'absolute',
    height: 550,
    opacity: 0.4
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: '#9FA5C0',
        marginLeft: 6,
        fontFamily: 'montserrat-regular',
    },
    ratingContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingBadge: {
        backgroundColor: "#252836",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    ratingText: {
        color: '#FF8700',
        fontSize: 16,
        fontFamily: 'montserrat-bold',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    playButton: {
        backgroundColor: '#FF8700',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 12,
        marginRight: 25,
    },
    playText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 16,
        fontFamily: 'montserrat-bold',
    },
    iconButton: {
        backgroundColor: '#252836',
        padding: 12,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    storySection: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
    storyTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'montserrat-bold',
        marginBottom: 8,
    },
    storyText: {
        color: '#9FA5C0',
        fontSize: 14,
        fontFamily: 'montserrat-regular',
        lineHeight: 22,
    },
    backgroundLinear: {
        width: "100%",
        height: 550,
        position: 'absolute',
    },
    castItem: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
        marginRight: 15,
        width: 150,
    },
    castImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    castTextContainer: {
        flexDirection: "column",
    },
    header: {
        color: "white",
        fontSize: 15,
        fontFamily: "montserrat-bold",
    },
    header2: {
        color: "#92929D",
        fontSize: 12,
        fontFamily: "montserrat-regular",
    },
    epidose: {
      marginBottom: 20,
        marginHorizontal: 20,
    },
    epidoseTitle:{
      color: 'white',
        fontSize: 18,
        fontFamily: 'montserrat-bold',
        marginBottom: 8,
    },
    backgroundLinear: {
    width: "100%",

   
},
});
