/**
 * ProfileScreen
 *
 * Bu ekran:
 * - Kullanıcı profil bilgilerini gösterir
 * - Premium üyelik kartı içerir
 * - Account & General ayar menülerini listeler
 * - useEffect ile örnek API çağrısı yapar (şu an UI'da kullanılmıyor)
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {View,Text,ScrollView,StyleSheet,Image,TouchableOpacity,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
  useEffect(() => {

    const fetchData = async () => {//api den veri çeken bir fonksiyon oluşturuyor
        //async  internetten veri bekleyecek demek
      try {

        let response = await fetch( //api ye  istek gönderir film verisini internetten alır
        //await  veri gelene kadar bekler
          "https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1"
        );

        let json = await response.json(); //gelen veriyi JavaScript objesine çevirir
        setData(json); //gelen film verisini data state'ine kaydeder ekran güncellenir.

      } catch (error) { // eğer api hata verirse consola yazdırır
        console.error(error);
      } finally {// hat olsa da olmasa da her zaman çalışır 
        setLoading(false); // veri yükleme işlemi bitti bilgisi verir
      }
    };

    fetchData();// fonksiyonu çalıştırır

  }, []); //bu kodun sadece ekran ilk açıldığında 1 kere çalışmasını sağlar (tekrar çalışmaz) dependency array.

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        {/**
         * SAYFA BAŞLIĞI
         */}
        <Text style={{
          fontSize:20,
          fontFamily:'montserrat-bold',
          color:'white',
          alignSelf:'center',
          marginBottom:15,
        }}>
          Profile
        </Text>

        {/**
         * PROFIL KARTI
         * kullanıcı adı  mail  düzenleme ikonu
         */}
        <View style={styles.profile}>
          <TouchableOpacity style={styles.premiumMember}>

            <Image
              source={require("../assets/Tiffany.png")}
              style={styles.profilePic}
            />

            <View style={styles.profileText}>
              <Text style={styles.header}>Tiffany</Text>
              <Text style={styles.header2}>
                Tiffanyjearsey@gmail.com
              </Text>
            </View>

            <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }}>
              <Image
                source={require("../assets/pencil.png")}
                style={styles.pencil}
              />
            </TouchableOpacity>

          </TouchableOpacity>
        </View>

        {/**
         * PREMIUM ÜYELİK KARTI
         * Turuncu arka plan  dekoratif circle efektleri
         */}
        <View style={styles.premium}> {/**çerçeve kısmı  */}
          <TouchableOpacity style={styles.premiumMember}> {/**tıklanabilir rozet */}

            <View style={styles.rozetWrapper}> {/**rozet kısmı  */}
              <Ionicons name="ribbon-outline" size={35} color="white" />
            </View>

            <View style={styles.premiumText}>
              <Text style={styles.headerPremium}>Premium Member</Text>
              <Text style={styles.header2Premium}>
                New movies are coming for you,
              </Text>
              <Text style={styles.header2Premium}>
                Download Now!
              </Text>
            </View>

            {/**
             * Arka plan dairesel efektler
             */}
            <View style={styles.circleEffect2}></View>
            <View style={styles.circleEffect}></View>

          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Account</Text>
       {/**
         * Account Menü Item
         */}
        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="person" size={30} color={'aqua'} />
            </View>
            <Text style={styles.itemText}>Member</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color={'aqua'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="lock-closed-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={28} color={'aqua'} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="notifications-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Notification</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color={'aqua'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="globe-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Language</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={28} color={'aqua'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="flag-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Country</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={28} color={'aqua'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="trash-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Clear Cache</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={28} color={'aqua'} />
        </TouchableOpacity>


        <Text style={styles.sectionTitle}>More</Text>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="shield-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Legal and Policies</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color={'aqua'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="help-circle-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>Help & Feedback</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color={'aqua'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconBack}>
              <Ionicons name="information-circle-outline" size={30} color={'gray'} />
            </View>
            <Text style={styles.itemText}>About Us</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color={'aqua'} />
        </TouchableOpacity>

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
    backgroundColor: "#1F1D2B",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#494952",
    padding:5,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  pencil: {
    width: 20,
    height: 20,
    tintColor: "aqua",
  },
  profileText: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
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
  premium: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8700",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 20,
  },
  premiumText: {
    flex: 1,
    flexDirection: "column",
  },
  headerPremium: {
    color: "white",
    fontSize: 18,
    fontFamily: "montserrat-bold",
    marginBottom: 5,
  },
  header2Premium: {
    color: "white",
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  circleEffect2: {
    position: "absolute",
    right: -30,
    top: -40,
    width: 150,
    height: 150,
    backgroundColor: "rgba(255, 160, 51, 0.42)",
    borderRadius: 100,
    zIndex: -1,
  },
  circleEffect: {
    position: "absolute",
    right: -45,
    top: -50,
    width: 140,
    height: 140,
    backgroundColor: "rgba(254, 179, 93, 0.39)",
    borderRadius: 100,
    zIndex: -1,
  },
  rozetWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#ffa642',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconBack:{
    backgroundColor: "#252836",
    width: 40,
    height: 40, 
    borderRadius: 100, 
    justifyContent: "center",
    alignItems: "center" 
  },
  accountItem: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#1E1F2D',
    paddingVertical:15,
    paddingHorizontal:20,
    marginBottom:15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#494952",
  },
  itemContent: {
    flexDirection:'row', 
    alignItems:'center'
  },
  itemText: {
    color:'white', 
    fontSize:17, 
    marginLeft:15, 
    fontFamily:'montserrat-bold'
  },
  sectionTitle: {
    color:'white',
    fontSize:25,
    fontWeight:'bold',
    marginBottom:15
  },
  premiumMember:{
 flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
});
