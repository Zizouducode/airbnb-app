import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needToBeFilled, setNeedToBeFilled] = useState(false);

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

        console.log(response.data);
      } catch (error) {
        alert("Invalid credentials");
        console.log(error.message);
      }
    }
  };

  // console.log("email=>", email);
  // console.log("password=>", password);
  return (
    <View style={styles.container}>
      <View style={styles.logoTitleContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.title}>Sign in</Text>
      </View>
      <KeyboardAwareScrollView style={styles.test}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(text) => {
              handleEmailChange(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              handlePasswordChange(text);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "salmon",
    height: 200,
  },

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
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 1,
    // backgroundColor: "red",
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
    borderRadius: "25",
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
});
