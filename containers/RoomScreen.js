import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import generateStars from "../functions/generatingStars";

export default function RoomScreen() {
  const { params } = useRoute();

  //State
  const [data, setData] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [showMore, setShowMore] = useState(3);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //Functions
  const handleShowMore = () => {
    if (showMoreVisible) {
      setShowMore(10);
      setShowMoreVisible(!showMoreVisible);
    } else {
      setShowMore(3);
      setShowMoreVisible(!showMoreVisible);
    }
  };

  //Fetch the data
  useEffect(() => {
    setActivityIndicator(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
        );
        if (response.data) {
          setData(response.data);
          setLatitude(response.data.location[1]);
          setLongitude(response.data.location[0]);
        }

        setActivityIndicator(false);
      } catch (error) {
        setActivityIndicator(false);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      {activityIndicator ? (
        <View
          style={[
            styles.activityIndicatorContainer,
            styles.activityIndicatorHorizontal,
          ]}
        >
          <ActivityIndicator size="large" color="#FFBAC0" />
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <SwiperFlatList
              //   autoplay
              //   autoplayDelay={2}
              //   autoplayLoop
              index={0}
              showPagination
              data={data.photos}
              renderItem={({ item }) => (
                <View style={styles.child}>
                  <ImageBackground
                    source={{ uri: item.url }}
                    resizeMode="cover"
                    style={styles.roomImg}
                  >
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{data.price} €</Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {data.title}
                </Text>
              </View>
              <View>
                <View style={styles.reviewsContainer}>
                  <Text style={styles.stars}>
                    {generateStars(data.ratingValue)}
                  </Text>
                  <Text style={styles.reviews}>{data.reviews} reviews</Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: data.user.account.photo.url,
              }}
              style={styles.userImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.descriptionContainter}>
            <Text style={styles.description} numberOfLines={showMore}>
              {data.description}
            </Text>
            {showMoreVisible ? (
              <Text style={styles.showMore} onPress={handleShowMore}>
                Voir plus
              </Text>
            ) : (
              <Text style={styles.showMore} onPress={handleShowMore}>
                Voir moins
              </Text>
            )}
          </View>
          <MapView
            // La MapView doit obligatoirement avoir des dimensions
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title={data.title}
            />
          </MapView>
        </View>
      )}
    </View>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 10,
    // backgroundColor: "red",
    marginBottom: 10,

    height: "100%",
  },

  roomImg: {
    height: 280,
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
    // backgroundColor: "red",
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 15,
    paddingHorizontal: 15,
    marginTop: 15,

    // backgroundColor: "purple",
  },

  titleContainer: {
    // backgroundColor: "red",
  },

  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    // backgroundColor: "red",
  },

  stars: {
    marginRight: 10,
  },
  reviews: {
    color: "lightgrey",
    fontWeight: "500",
  },

  descriptionContainter: {
    padding: 15,
    // backgroundColor: "yellow",
  },

  description: {
    marginBottom: 10,
  },

  showMore: {
    color: "#71717171",
  },

  userImg: {
    height: 80,
    width: 80,
    borderRadius: "50%",
  },
  activityIndicatorContainer: {
    // flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  activityIndicatorHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  child: { width, justifyContent: "center" },

  map: {
    flex: 1,
  },
});
