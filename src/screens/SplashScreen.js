import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
//import AnimatedLoader from "react-native-animated-loader";

const WelcomeScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem("userDetails").then((value) =>
        navigation.replace(value === null ? "Welcome" : "Login")
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.main}>
      <LottieView source={require("./images/splash.json")} autoPlay loop />
    </View>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EFDFEC",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  imageContainer: {
    flex: 0.4,
    marginTop: 8,
    alignItems: "center",
  },
  image: {
    marginTop: 16,
    width: "100%",
    height: "60%",
    resizeMode: "contain",
  },
  textContainer: {
    flex: 0.4,
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 24,
  },
});
