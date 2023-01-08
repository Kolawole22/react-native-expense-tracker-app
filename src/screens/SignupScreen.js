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
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import EntryForm from "../components/textInput.js";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [age, setAge] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [loading, setLoading] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  function nameInputHandler(enteredText) {
    setName(enteredText);
    console.log(enteredText);
  }

  function emailInputHandler(enteredText) {
    setEmail(enteredText);
    console.log(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  function secondPasswordInputHandler(enteredText) {
    setSecondPassword(enteredText);
  }

  function ageInputHandler(enteredText) {
    setAge(enteredText);
  }

  function accountBalanceInputHandler(enteredText) {
    setAccountBalance(enteredText);
  }

  const handleSubmitButton = () => {
    if (!email) {
      Alert.alert("Warning!", "Please enter your Email");
      return;
    }
    if (!name) {
      Alert.alert("Warning!", "Please enter your Name");
    }
    if (!password) {
      Alert.alert("Warning!", "Please enter your Password");
      return;
    }
    if (password !== secondPassword) {
      Alert.alert("Warning!", "Passwords do not match");
      return;
    }
    if (!age) {
      Alert.alert("Warning!", "Please enter your age");
      return;
    }
    if (!accountBalance) {
      Alert.alert("Warning!", "Please enter your budget");
      return;
    }
    {
      try {
        var rawUserDetails = {
          Name: name,
          Password: password,
          Email: email,
          Age: age,
          AccountBalance: accountBalance,
        };
        var userDetails = JSON.stringify(rawUserDetails);
        AsyncStorage.setItem("userDetails", userDetails);
        navigation.navigate("Login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.main}>
      <Header title="Sign up" />
      <KeyboardAvoidingView>
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
          <Text>Full Name</Text>
        </View>
        <EntryForm
          onChangeText={nameInputHandler}
          placeholder="e.g Iwalewa Kolawole"
        />
        <View style={styles.textContainer}>
          <Text>Age</Text>
        </View>
        <EntryForm
          onChangeText={ageInputHandler}
          placeholder="Enter your age"
          keyboardType="numeric"
        />
        <View style={styles.textContainer}>
          <Text>Budget</Text>
        </View>
        <EntryForm
          onChangeText={accountBalanceInputHandler}
          placeholder="You can edit it later"
          keyboardType="numeric"
        />
        <View style={styles.textContainer}>
          <Text>Password</Text>
        </View>
        <EntryForm
          placeholder="8 characters or more"
          keyboardType="password"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
        />
        <View style={styles.textContainer}>
          <Text>Confirm Password</Text>
        </View>
        <EntryForm
          placeholder="Enter your password again"
          keyboardType="password"
          secureTextEntry={true}
          onChangeText={secondPasswordInputHandler}
        />
        <ButtonComponent title="Sign up" onPress={handleSubmitButton} />
        <View
          style={{
            marginTop: 64,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#efdfec",
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
