import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "../../ThemeContext";

const WelcomeScreen = ({ navigation }) => {
  const [theme] = useContext(ThemeContext);
  return (
    <View style={styles(theme).main}>
      <Header title="Wallet" />
      <View style={styles(theme).imageContainer}>
        <Image
          style={styles(theme).image}
          source={require("./images/wallet.jpeg")}
        />
      </View>
      <View style={styles(theme).textContainer}>
        <Text style={styles(theme).text}>A BETTER and EASIER way to</Text>
        <Text style={styles(theme).text}>track your income</Text>
        <Text style={styles(theme).text}>and expenses</Text>
      </View>
      <ButtonComponent
        title="Continue"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};
export default WelcomeScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: "#ffffff",
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
