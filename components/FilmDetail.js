import { View,Text,StyleSheet,TouchableOpacity, ScrollView, ImageBackground, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FilmDetail () {
    const route  = useRoute();
    const navigation = useNavigation();
    const {movie} = route.params;
    return(
       <Modal >
        <ScrollView style={styles.container}>
        <View style={{margin: 0}}>
            <LinearGradient colors={['#1F1D2B','#09080f']} style={styles.backgroundLinear}>
            <ImageBackground source={{uri:movie.Poster}}
                style={styles.backgroundPoster}
                resizeMode="cover"/>
            </LinearGradient>
        </View>
             
   
        <View style={styles.headerRow}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"white"}/>
            </TouchableOpacity>
            <Text style={styles.title}>
                {movie.Title.length > 20 ?movie.Title.slice(0,20)+"..":movie.Title}
            </Text>
            <TouchableOpacity style={styles.heartWrapper}>
            <Image source={require("../assets/heart.png")} style={styles.heart} />
            </TouchableOpacity>
        </View>

        <View style={styles.posterContainer}>
            <Image 
            source={{uri:movie.Poster}} 
            style={styles.poster}
            resizeMode='cover'
            />
        </View>
            <View style={styles.backgroundPosterContainer}>
        
            </View>
        <View style={styles.infoRow}>
            <View style={styles.infoItem}>
                <Ionicons name="calendar" size="16" color="#9FA5C0"/>
                <Text style={styles.infoText}>{movie.Year}</Text>
            </View>
            <View style={styles.infoItem}>
                <Ionicons name="time" size="16" color="#9FA5C0"/>
                <Text style={styles.infoText}>148 Minutes</Text>
            </View>
            <View style={styles.infoItem}>
                <Ionicons name="film" size="16" color="#9FA5C0"/>
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
            <Ionicons name="play" size={20} color={"white"}/>
            <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
            <Feather name="download" size={20} color={"white"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
            <Feather name="share" size={20} color="#12CDD9"/>
        </TouchableOpacity>
    </View>
    <View style={styles.storySection}>
        <Text style={styles.storyTitle}>Story Line</Text>
        <Text style={styles.storyText}>For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk.</Text>
    </View>
     <View style={styles.storySection}>
        <Text style={styles.storyTitle}>Cast And Crew</Text>
        <Text style={styles.storyText}>Batman movies are some of the most popular superhero films in the world. They tell the story of Bruce Wayne, a billionaire who fights crime in Gotham City as Batman. Each movie explores his struggle between justice and vengeance. The films are known for their dark atmosphere and complex villains like the Joker and Bane. Overall, Batman movies continue to inspire audiences with their thrilling action and deep moral themes.</Text>
    </View>
    
    </ScrollView>
    </Modal>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1D2B',
   //padding: 20,
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
    margin:10,
    marginTop:40,
    
  },
   backgroundPosterContainer: {
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 20,
    position:'absolute',
  },
  poster: {
    width: 220,
    height: 320,
    borderRadius: 20,
  },
   backgroundPoster: {
    width: "100%",
    height: 550,
    opacity:0.2,
    position: 'absolute',
    top: 0,
    left: 0

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
    marginHorizontal:20,
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
});