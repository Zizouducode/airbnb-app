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
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(true);

  const [needToBeFilled, setNeedToBeFilled] = useState(false);
  const [samePassword, setSamePassword] = useState(false);

  //Functions
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handlePasswordConfirmationChange = (text) => {
    setIsSamePassword(false);
    setpasswordConfirmation(text);
    if (password === passwordConfirmation) {
      setIsSamePassword(true);
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSignUp = async () => {
    // const userToken = "secret-token";
    // setToken(userToken);
    if (
      !email ||
      !username ||
      !description ||
      !password ||
      !passwordConfirmation
    ) {
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
          console.log(response.data);
        }
      } catch (error) {
        alert("This email is already used");
        console.log(error.message);
      }
    }
  };

  // console.log("email=>", email);
  // console.log("username=>", username);
  // console.log("description=>", description);
  console.log("password=>", password);
  console.log("passwordConfirmation=>", passwordConfirmation);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.logoTitleContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={styles.title}>Sign up</Text>
        </View>

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
            placeholder="username"
            onChangeText={(text) => {
              handleUsernameChange(text);
            }}
          />

          <TextInput
            style={styles.inputDescription}
            placeholder="Describe yoursel in a few words"
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => {
              handleDescriptionChange(text);
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
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              handlePasswordConfirmationChange(text);
            }}
          />
        </View>

        <View style={styles.buttonsContainer}>
          {needToBeFilled ? (
            <Text style={styles.errorMessage}>Please fill all fields</Text>
          ) : null}
          {!isSamePassword ? (
            <Text style={styles.errorMessage}>Passwords must be the same</Text>
          ) : null}
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
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 1,
    marginVertical: 10,
    // backgroundColor: "red",
  },

  inputDescription: {
    height: 120,
    borderColor: "#FFBAC0",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
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
});
