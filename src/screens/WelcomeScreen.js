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

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Header title="Wallet" />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("./images/wallet.jpeg")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>A BETTER and EASIER way to</Text>
        <Text style={styles.text}>track your income</Text>
        <Text style={styles.text}>expenses</Text>
      </View>
      <ButtonComponent
        title="Continue"
        onPress={() => navigation.navigate("Signup")}
      />
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
