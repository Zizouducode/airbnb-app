import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import generateStars from "../functions/generatingStars";

export default function Rooms({ item }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Room", { roomId: item._id });
        }}
      >
        <ImageBackground
          source={{ uri: item.photos[0].url }}
          resizeMode="cover"
          style={styles.roomImg}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price} €</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <View>
            <View style={styles.reviewsContainer}>
              <Text style={styles.stars}>
                {generateStars(item.ratingValue)}
              </Text>
              <Text style={styles.reviews}>{item.reviews} reviews</Text>
            </View>
          </View>
        </View>
        <Image
          source={{
            uri: item.user.account.photo.url,
          }}
          style={styles.userImg}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 10,
    // backgroundColor: "red",
    marginBottom: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },

  roomImg: {
    height: 180,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },

  priceContainer: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  price: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
    width: 280,
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  titleContainer: {
    // backgroundColor: "red",
  },

  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  stars: {
    marginRight: 10,
  },
  reviews: {
    color: "lightgrey",
    fontWeight: "500",
  },

  userImg: {
    height: 70,
    width: 70,
    borderRadius: "50%",
  },
});
