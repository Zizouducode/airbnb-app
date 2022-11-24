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
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [needToBeFilled, setNeedToBeFilled] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  //Functions
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handlePasswordConfirmationChange = (text) => {
    setpasswordConfirmation(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSignUp = async () => {
    setActivityIndicator(true);
    if (
      !email ||
      !username ||
      !description ||
      !password ||
      !passwordConfirmation
    ) {
      setActivityIndicator(false);
      setNeedToBeFilled(true);
    } else {
      try {
        setNeedToBeFilled(false);
        if (password === passwordConfirmation) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          setToken(response.data.token);
          // console.log(response.data);
          setActivityIndicator(false);
          alert("You are registered");
        }
      } catch (error) {
        setActivityIndicator(false);
        alert("This email or username is already used");
        console.log(error.message);
      }
    }
  };

  // console.log("email=>", email);
  // console.log("username=>", username);
  // console.log("description=>", description);
  // console.log("password=>", password);
  // console.log("passwordConfirmation=>", passwordConfirmation);
  console.log("passwordVisible=>", passwordVisible);
  console.log("confirmPasswordVisible=>", confirmPasswordVisible);

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
            <Text style={styles.title}>Sign up</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="email"
              activeUnderlineColor="#FFBAC0"
              underlineColor="#FFBAC0"
              onChangeText={(text) => {
                handleEmailChange(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="username"
              activeUnderlineColor="#FFBAC0"
              underlineColor="#FFBAC0"
              onChangeText={(text) => {
                handleUsernameChange(text);
              }}
            />

            <TextInput
              style={styles.inputDescription}
              placeholder="Describe yourself in a few words"
              multiline={true}
              numberOfLines={8}
              activeUnderlineColor="#FFBAC0"
              underlineColor="00FFFFFF"
              onChangeText={(text) => {
                handleDescriptionChange(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={passwordVisible}
              activeUnderlineColor="#FFBAC0"
              underlineColor="#FFBAC0"
              backgroundColor="white"
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
            <TextInput
              style={styles.input}
              placeholder="confirm your password"
              secureTextEntry={confirmPasswordVisible}
              activeUnderlineColor="#FFBAC0"
              underlineColor="#FFBAC0"
              right={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  color="#FFBAC0"
                  backgroundColor="white"
                  name={confirmPasswordVisible ? "eye" : "eye-off"}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
              }
              onChangeText={(text) => {
                handlePasswordConfirmationChange(text);
              }}
            />
          </View>

          <View style={styles.buttonsContainer}>
            {needToBeFilled ? (
              <Text style={styles.errorMessage}>Please fill all fields</Text>
            ) : null}
            {passwordConfirmation && password !== passwordConfirmation && (
              <Text style={styles.errorMessage}>
                Passwords must be the same
              </Text>
            )}
            {/* {!isSamePassword ? (
              <Text style={styles.errorMessage}>
                Passwords must be the same
              </Text>
            ) : null} */}
            <View style={styles.signInBtnContainer}>
              <TouchableOpacity title="Sign in" onPress={handleSignUp}>
                <Text style={styles.signIn}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.registerText}>
                  Already have an account ? Sign In
                </Text>
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
    marginVertical: 20,
  },
  logo: {
    resizeMode: "cover",
    height: 150,
    width: 150,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
    color: "#717171",
  },

  inputContainer: {
    width: Dimensions.get("window").width - 60,
  },
  input: {
    height: 50,
    // borderBottomColor: "#FFBAC0",
    // borderBottomWidth: 1,

    marginVertical: 10,
    backgroundColor: "white",
  },

  inputDescription: {
    height: 120,
    borderColor: "#FFBAC0",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
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
