import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntryForm from "../components/textInput.js";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "../../ThemeContext";
import UserDataContext from "../../userDataContext";

const SignupScreen = ({ navigation, props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [age, setAge] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [loading, setLoading] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [theme] = useContext(ThemeContext);
  const [userData, setUserData] = useContext(UserDataContext);

  function nameInputHandler(enteredText) {
    setName(enteredText);
    //console.log(enteredText);
  }

  function emailInputHandler(enteredText) {
    setEmail(enteredText);
    //console.log(enteredText);
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

  const handleSubmitButton = async () => {
    if (!email) {
      Alert.alert("Warning!", "Please enter your Email");
      return;
    }
    if (!name) {
      Alert.alert("Warning!", "Please enter your Name");
      return;
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
        const rawUserDetails = {
          Name: name,
          Password: password,
          Email: email,
          Age: age,
          AccountBalance: accountBalance,
        };
        setUserData(rawUserDetails);
        //console.log(userData);

        var userDetails = JSON.stringify(rawUserDetails);
        //console.log(userDetails);
        await AsyncStorage.setItem("userDetails", userDetails);
        //const storedUserDetails = await AsyncStorage.getItem("userDetails");
        //setUserData(JSON.parse(storedUserDetails));
        navigation.navigate("Login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles(theme).main}>
      <Header title="Sign up" />
      <View>
        <EntryForm
          placeholder="user@gmail.com"
          keyboardType="email-address"
          onChangeText={emailInputHandler}
          label="Email"
        />
        <EntryForm
          onChangeText={nameInputHandler}
          placeholder="e.g Iwalewa Kolawole"
          label="Name"
        />
        <EntryForm
          onChangeText={ageInputHandler}
          placeholder="Enter your age"
          keyboardType="numeric"
          label="Age"
        />
        <EntryForm
          onChangeText={accountBalanceInputHandler}
          placeholder="You can edit it later"
          keyboardType="numeric"
          label="Budget"
        />
        <EntryForm
          placeholder="8 characters or more"
          keyboardType="password"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
          label="Password"
        />
        <EntryForm
          placeholder="Enter your password again"
          keyboardType="password"
          secureTextEntry={true}
          onChangeText={secondPasswordInputHandler}
          label="Confirm Password"
        />
        <ButtonComponent title="Sign up" onPress={handleSubmitButton} />
        <View
          style={{
            marginTop: 64,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      </View>
    </ScrollView>
  );
};
export default SignupScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    headerContainer: {
      flex: 20,
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
      color: theme.text,
    },
  });
