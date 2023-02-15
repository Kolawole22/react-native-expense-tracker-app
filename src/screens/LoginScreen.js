import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntryForm from "../components/textInput.js";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "../../ThemeContext";
import UserDataContext from "../../userDataContext";

const LoginScreen = ({ navigation, props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedEmail, setStoredEmail] = useState(null);
  const [storedPassword, setStoredPassword] = useState("");
  const [theme] = useContext(ThemeContext);
  const parsedUserDetails = [];
  const [userData, setUserData] = useContext(UserDataContext);
  //const inputRef = useRef(null);

  useEffect(() => {
    try {
      if (storedEmail === null) {
        AsyncStorage.getItem("userDetails").then((value) => {
          setUserData(JSON.parse(value));
          setStoredEmail(userData.Email);
          setStoredPassword(userData.Password);
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(parsedUserDetails);
  }, [userData]);

  function emailInputHandler(enteredText) {
    setEmail(enteredText);
    //console.log(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  const handleSubmitPress = () => {
    if (email === storedEmail && password === storedPassword) {
      //setEmail("");
      setPassword("");
      //inputRef.current.blur();
      navigation.navigate("Tabs");
      return;
    }
    if (!email) {
      Alert.alert("Warning!", "Please enter your Email");
      return;
    }
    if (!password) {
      Alert.alert("Warning!", "Please enter your Password");
      return;
    } else {
      Alert.alert("Warning!", "Wrong Email or Password entered");
    }
    setLoading(true);
  };

  return (
    <View style={styles(theme).main}>
      <Header title="Log in" />
      <ImageBackground>
        <View style={styles(theme).imageContainer}>
          <Image
            style={styles(theme).image}
            source={require("./images/signin.png")}
          />
        </View>
        <EntryForm
          placeholder="user@gmail.com"
          keyboardType="email-address"
          onChangeText={emailInputHandler}
          label="Email"
          //onBlur={setEmail(email)}
        />
        <EntryForm
          placeholder="Enter your Password"
          keyboardType="password"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
          label="Password"
          //ref={inputRef}
        />
        <Pressable style={{ marginBottom: 32, alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 16, color: theme.text }}>
              Forgot Password
            </Text>
          </View>
        </Pressable>
        <ButtonComponent title="Log in" onPress={handleSubmitPress} />
        <View
          style={{
            flexDirection: "row",
            marginTop: 64,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>
            Dont't have an account yet?
          </Text>
          <Pressable
            style={{ marginLeft: 4 }}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    headerContainer: {
      flex: 0.2,
      marginTop: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      color: theme.text,
      fontSize: 16,
    },
    imageContainer: {
      flex: 0.3,
      marginTop: 8,
      marginBottom: 64,
      alignItems: "center",
    },
    image: {
      marginTop: 16,
      width: "100%",
      height: "60%",
      resizeMode: "contain",
    },
    textContainer: {
      justifyContent: "center",
      marginLeft: 8,
    },
    text: {
      fontSize: 8,
      color: theme.color,
    },
  });
