import { View, Text, FlatList, Image, StyleSheet} from "react-native";

function HomeSliderWidget (props) {
    return (
      <View>
         <Text style={styles.sectionTitle}>{props.title}</Text>
        <FlatList
          horizontal
          data={props?.data}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.image} />
              <Text style={styles.title}>{item.Title}</Text>

            {props?.description && <Text style={styles.recommendGenre}>Action</Text>}
            </View>
          )}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    sectionTitle: {
      color: "white",
      fontSize: 18,
      marginVertical: 16,
      fontFamily: "montserrat-bold",
    },
    card: {
      width: 120,
      marginRight: 20,
      backgroundColor: "#252836",
      borderRadius: 12,
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
        fontFamily: "montserrat-bold",
    },
   recommendGenre: {
    color: "#696974",
    fontSize: 12,
    paddingHorizontal: 6,
    fontFamily: "montserrat-regular",
  },
  });
  export default HomeSliderWidget;