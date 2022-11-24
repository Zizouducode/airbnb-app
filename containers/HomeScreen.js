import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import Rooms from "../components/Rooms";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(false);

  //Fetch the data
  useEffect(() => {
    setActivityIndicator(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        if (response.data) {
          setData(response.data);
          setActivityIndicator(false);
        }

        // console.log("response.data=>", response.data);
      } catch (error) {
        setActivityIndicator(false);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
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
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => <Rooms item={item}></Rooms>}
          />

          {/* <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          /> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // flex: 1,
    // alignItems: "center",
    width: Dimensions.get("window").width,
    padding: 15,
    // backgroundColor: "blue",
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
