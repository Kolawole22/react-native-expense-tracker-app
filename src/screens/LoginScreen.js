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
import { useState, useEffect } from "react";
import EntryForm from "../components/textInput.js";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const parsedUserDetails = [];

  useEffect(() => {
    getData();
    // console.log(parsedUserDetails);
  }, []);

  const getData = async () => {
    try {
      const savedUserDetails = await AsyncStorage.getItem("userDetails");
      const parsedUserDetails = JSON.parse(savedUserDetails);
      setStoredEmail(parsedUserDetails.Email);
      setStoredPassword(parsedUserDetails.Password);
      console.log(parsedUserDetails);
      console.log(parsedUserDetails.Email);
    } catch (error) {
      console.log(error);
    }
  };

  function emailInputHandler(enteredText) {
    setEmail(enteredText);
    console.log(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  const handleSubmitPress = () => {
    if (email === storedEmail && password === storedPassword) {
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
    <View style={styles.main}>
      <Header title="Log in" />
      <ImageBackground>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require("./images/signin.png")} />
        </View>
        <View style={styles.textContainer}>
          <Text>Email</Text>
        </View>
        <EntryForm
          placeholder="user@gmail.com"
          keyboardType="email-address"
          onChangeText={emailInputHandler}
        />
        <View style={styles.textContainer}>
          <Text>Password</Text>
        </View>
        <EntryForm
          placeholder="Enter your Password"
          keyboardType="password"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
        />
        <Pressable style={{ marginBottom: 32, alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 16 }}>Forgot Password</Text>
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
          <Text style={{ fontSize: 16 }}>Dont't have an account yet?</Text>
          <Pressable
            style={{ marginLeft: 4 }}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Register</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EFDFEC",
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
    color: "black",
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
  },
});
