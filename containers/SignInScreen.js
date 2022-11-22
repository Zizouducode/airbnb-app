import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needToBeFilled, setNeedToBeFilled] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [activityIndicator, setActivityIndicator] = useState(false);

  //Functions
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignIn = async () => {
    // const userToken = "secret-token";
    // setToken(userToken);
    setActivityIndicator(true);
    if (!email || !password) {
      setNeedToBeFilled(true);
    } else {
      try {
        setNeedToBeFilled(false);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        setActivityIndicator(false);
        console.log(response.data);
      } catch (error) {
        setActivityIndicator(false);
        alert("Invalid credentials");
        console.log(error.message);
      }
    }
  };

  // console.log("email=>", email);
  // console.log("password=>", password);
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
        <KeyboardAwareScrollView>
          <View style={styles.logoTitleContainer}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.title}>Sign in</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              activeUnderlineColor="#FFBAC0"
              underlineColor="#FFBAC0"
              placeholder="email"
              onChangeText={(text) => {
                handleEmailChange(text);
              }}
            />
            <TextInput
              style={styles.input}
              activeUnderlineColor="#FFBAC0"
              underlineColor="#FFBAC0"
              placeholder="password"
              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  color="#FFBAC0"
                  backgroundColor="white"
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              onChangeText={(text) => {
                handlePasswordChange(text);
              }}
            />
          </View>

          <View style={styles.buttonsContainer}>
            {needToBeFilled ? (
              <Text style={styles.errorMessage}>Please fill all fields</Text>
            ) : null}
            <View style={styles.signInBtnContainer}>
              <TouchableOpacity title="Sign in" onPress={handleSignIn}>
                <Text style={styles.signIn}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.registerText}>No account ? Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    padding: 30,
  },

  logoTitleContainer: {
    alignItems: "center",
    marginVertical: 50,
  },
  logo: {
    resizeMode: "cover",
    height: 180,
    width: 180,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
    color: "#717171",
  },

  inputContainer: {
    width: Dimensions.get("window").width - 60,
    marginVertical: 80,
  },
  input: {
    height: 50,
    // borderBottomColor: "#FFBAC0",
    // borderBottomWidth: 1,

    backgroundColor: "white",
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  errorMessage: {
    color: "#EB5A62",
    marginBottom: 10,
  },

  signInBtnContainer: {
    height: 55,
    width: 200,
    borderColor: "#EB5A62",
    borderWidth: 3,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  signIn: {
    color: "#717171",
    fontSize: 18,
    fontWeight: "500",
  },

  registerContainer: {
    alignItems: "center",
  },

  registerText: {
    color: "#717171",
    fontWeight: "500",
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
