import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";
export default function AroundMeScreen() {
  //States and variables
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [activityIndiactor, setactivityIndiactor] = useState(true);
  const [data, setData] = useState(null);

  //Get the current location of the user
  useEffect(() => {
    const getPermission = async () => {
      try {
        //Request localisation persmission
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("status=>", status);
        if (status === "granted") {
          //Get the localisation of the user
          const location = await Location.getCurrentPositionAsync();
          //   console.log("location=>", location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          //Reaquest the rooms nearby the user
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setData(response.data);
          //   console.log("response=>", response.data);
          setactivityIndiactor(false);
        } else {
          alert("Access Denied");
        }
      } catch (error) {
        activityIndiactor(false);
        console.log(error.message);
      }
    };
    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      {activityIndiactor ? (
        <View
          style={[
            styles.activityIndicatorContainer,
            styles.activityIndicatorHorizontal,
          ]}
        >
          <ActivityIndicator size="large" color="#FFBAC0" />
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          {data.map((marker) => {
            return (
              <TouchableOpacity
                key={marker._id}
                onPress={() => {
                  console.log("coucou");
                  navigation.navigate("Room", { roomId: data._id });
                }}
              >
                <MapView.Marker
                  // key={marker._id}
                  coordinate={{
                    latitude: marker.location[1],
                    longitude: marker.location[0],
                  }}
                  title={marker.title}
                />
              </TouchableOpacity>
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  map: {
    height: "100%",
    width: "100%",
  },

  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  activityIndicatorHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
