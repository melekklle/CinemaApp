/**
 * Wishlist Component
 *
 * Bu ekran seçilen bir filmin detaylarını gösterir.
 * Film verisi route params üzerinden alınır.
 * BlurView ve LinearGradient ile görsel efekt uygulanmıştır.
 * Share modal conditional rendering ile kontrol edilir.
 */

import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function Wishlist(props) { //wishlist ekranını dışarıdan kullanılabilir yapar ve başka ekrandan gelen verileri (props) almasını sağlar

  const navigation = useNavigation();
//ekranlar arası geçiş 
  const movie = props?.route?.params?.movie;//başka ekrandan gönderilen film bilgisini güvenli şekilde alıp movie değişkenine kaydeder

  /**
   * showShareModal:
   * share modalın açılıp kapanmasını kontrol eder
   */
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    navigation.getParent()?.setOptions({});

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#1F1D2B',
          borderTopWidth: 0,
          height: 65,
          paddingTop: 10,
          paddingHorizontal: 45,
        },
      });
    };
  }, [navigation]);

  /**
   * castData:
   * local sabit verir
   * flatList ile yatay şekilde render edilir
   */
  const castData = [
    { id: '1', name: 'Dario Russo', role: 'Director', image: require("../assets/Image.png") },
    { id: '2', name: 'Dario Russo', role: 'Director and Writer', image: require("../assets/Image.png") },
    { id: '3', name: 'David Ashby', role: 'Writer', image: require("../assets/Image.png") },
    { id: '4', name: 'John Doe', role: 'Actor', image: require("../assets/Image.png") },
    { id: '5', name: 'Jane Doe', role: 'Actress', image: require("../assets/Image.png") },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>

        {/**
         * BlurView:
         * arka planı bulanık göstermek için kullanılır*
         */}
        <BlurView intensity={100} tint="dark" style={styles.backgroundPoster}>
          <Image
            source={{ uri: movie?.Poster }}
            style={styles.backgroundPoster}
            resizeMode="cover"
          />
        </BlurView>

       { /**
         * LinearGradient:
         * arka plan geçiş efekti sağlar
         * üstten alta doğru koyulaşma efekti verir
         */}
        <LinearGradient
          colors={['transparent', 'rgba(31,29,43,0.8)', 'rgba(31,29,43,1)']}
          style={styles.backgroundLinear}
        >

          {/* Header Bölümü */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={"white"} />
            </TouchableOpacity>

            <Text style={styles.title}>Download</Text>

            <TouchableOpacity style={styles.heartWrapper}>
              <Image source={require("../assets/heart.png")} style={styles.heart} />
            </TouchableOpacity>
          </View>

          {/* Film Posteri */}
          <View style={styles.posterContainer}>
            <Image
              source={{ uri: movie?.Poster }}
              style={styles.poster}
              resizeMode='cover'
            />
          </View>

          {/* Film Bilgi Satırı */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={16} color="#9FA5C0" />
              <Text style={styles.infoText}>{movie?.Year}</Text>
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

          {/* Rating Badge */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ 4.5</Text>
            </View>
          </View>

          {/* Butonlar */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.playButton}> {/**sadece ui amaçlı play buton */}
              <Ionicons name="play" size={20} color={"white"} />
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}> {/**sadece ui amaçlı indirme butonu */}
              <Feather name="download" size={20} color={"white"} />
            </TouchableOpacity>

            {/**
             * Share butonu:
             * setShowShareModal(true) ile modal açılır
             */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowShareModal(true)} // butona basınca paylaş kısmıa açılır 
            >
              <Feather name="share" size={20} color="#12CDD9" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Story Bölümü */}
        <View style={styles.storySection}>
          <Text style={styles.storyTitle}>Story Line</Text>
          <Text style={styles.storyText}>
            Film açıklaması burada gösterilir.
          </Text>
        </View>

        {/* Cast Bölümü */}
        <View style={styles.storySection}>
          <Text style={styles.storyTitle}>Cast And Crew</Text>
          <FlatList
            data={castData} //castDatadan kullanıcıları çeker
            keyExtractor={(item) => item.id} // her birine farklı id verir
            horizontal // yan yana sıralar 
            showsHorizontalScrollIndicator={false} // alttaki scroll cizgisini gizler 
            contentContainerStyle={{ paddingVertical: 10 }}// listenin  altına üstüne bosluk 
            renderItem={({ item }) => (// listedeki tüm kişilere bu stilleri ver
              <View style={styles.castItem}>{/**kişilerin dış çerçevesi  */} 
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

      {showShareModal && ( //eğer showShareModal true ise paylaşım penceresi görünür false ise hiç görünmez burda true
        <View style={styles.absoluteOverlay}> {/*ekranın üstüne çıkan karartılmış arka plan (modal arkası).*/}
          <BlurView intensity={80} tint="dark" style={styles.fullScreenBlur}> {/**arka plamı bulanık yapar  */}
            <View style={styles.shareBox}>

              {/* Modal Kapatma Butonu */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowShareModal(false)} // butona basınca modal kapanır
              >
                <Ionicons name="close" size={30} color={'white'} />
              </TouchableOpacity>

              <Text style={styles.shareTitle}>Share to</Text>

              {/* ikonları */}
              <View style={styles.shareIcons}>
                <Ionicons name="logo-facebook" size={35} color={'#4267B2'} />
                <Ionicons name="logo-instagram" size={35} color={'#E1306C'} />
                <Ionicons name="logo-pinterest" size={35} color={'red'} />
                <Ionicons name="paper-plane-outline" size={35} color={'#00C2FF'} />
              </View>

            </View>
          </BlurView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     backgroundColor: '#1F1D2B'
     },
  headerRow: { 
    flexDirection: 'row',
     justifyContent: 'space-between',
      alignItems: 'center', 
      margin: 20 
    },
  title: {
     color: 'white',
      fontSize: 18,
       fontFamily: 'montserrat-bold'
       },
  posterContainer: { 
    alignItems: 'center',
     marginBottom: 20, 
     margin: 10,
      marginTop: 40 
    },
  poster: { 
    width: 220, 
    height: 320,
     borderRadius: 20 
    },
  backgroundPoster: {
     width: "100%", 
     position: 'absolute',
      height: 550,
       opacity: 0.4 
      },
  backgroundLinear: {
     width: "100%"
     },
  infoRow: {
     flexDirection: 'row',
      justifyContent: 'space-around',
       marginBottom: 15
       },
  infoItem: { 
    flexDirection: 'row',
     alignItems: 'center'
     },
  infoText: { 
    color: '#9FA5C0',
     marginLeft: 6,
      fontFamily: 'montserrat-regular'
     },
  ratingContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  ratingBadge: { 
    backgroundColor: "#252836",
     borderRadius: 10,
      paddingHorizontal: 10,
       paddingVertical: 5, 
       overflow: "hidden"
       },
  ratingText: {
     color: '#FF8700',
     fontSize: 16,
      fontFamily: 'montserrat-bold' 
    },
  buttonsRow: {
     flexDirection: 'row',
      justifyContent: 'center',
       alignItems: 'center', 
       marginBottom: 30 
      },
  playButton: { 
    backgroundColor: '#FF8700',
     flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
       paddingHorizontal: 25,
        paddingVertical: 12,
         marginRight: 25 
        },
  playText: { 
    color: 'white', 
    marginLeft: 8,
     fontSize: 16, 
     fontFamily: 'montserrat-bold'
     },
  iconButton: { 
    backgroundColor: '#252836',
     padding: 12, 
     borderRadius: 30, 
     marginHorizontal: 5 
    },
  storySection: { 
    marginBottom: 20,
     marginHorizontal: 20
     },
  storyTitle: { 
    color: 'white', 
    fontSize: 18, 
    fontFamily: 'montserrat-bold',
     marginBottom: 8
     },
  storyText: { 
    color: '#9FA5C0',
     fontSize: 14,
      fontFamily: 'montserrat-regular',
       lineHeight: 22 
      },
  castItem: { 
    flexDirection: "row",
     alignItems: "center",
      borderRadius: 15,
       padding: 10,
        marginRight: 15,
         width: 150
         },
  castImage: {
    width: 50,
     height: 50, 
     borderRadius: 25, 
     marginRight: 10
     },
  castTextContainer: {
     flexDirection: "column"
     },
  epidose: {
     marginBottom: 10, 
     marginHorizontal: 5 
    },
  epidoseTitle: { 
    color: 'white',
     fontSize: 18,
      fontFamily: 'montserrat-bold',
       marginBottom: 8
       },
  header: {
     color: "white",
      fontSize: 15, 
      fontFamily: "montserrat-bold" 
    },
  header2: { 
    color: "#92929D", 
    fontSize: 12, 
    fontFamily: "montserrat-regular"
   },
  absoluteOverlay: {
     position: 'absolute', 
     top: 0,
      left: 0,
       right: 0,
        bottom: 0,
         justifyContent: 'center',
          alignItems: 'center',
           zIndex: 9999 
          },
  fullScreenBlur: { 
    position: 'absolute', 
    top: 0,
     left: 0,
      right: 0,
      bottom: 0,
       justifyContent: 'center', 
       alignItems: 'center' 
      },
  shareBox: {
     backgroundColor: '#252836',
      width: '90%', 
      padding: 50,
       borderRadius: 20,
        alignItems: 'center'
       },
  closeButton: {
     position: 'absolute',
      top: 10,
       right: 10 
      },
  shareTitle: { 
    color: 'white', 
    fontSize: 20,
     fontFamily: 'montserrat-bold',
      marginBottom: 15 
    },
  shareIcons: { 
    flexDirection: 'row',
     justifyContent: 'space-around',
      width: '100%' 
    },
});
