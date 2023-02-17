import {
  StyleSheet,
  //Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
//import { useTheme } from "react-native-paper";
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/header.js";
import ThemeContext from "../../ThemeContext";
import ExpenseContext from "../../ExpenseContext";
import { lightTheme, darkTheme } from "../../Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import { useStyles } from './styles';
//import { Button } from "react-native-paper";

const SettingsScreen = ({ props, navigation }) => {
  //const [theme, setTheme] = useState("light");

  const [theme, setTheme] = useContext(ThemeContext);
  const [expenses, setExpenses] = useContext(ExpenseContext);
  //const [themes, setThemes] = useState(theme);
  const [isSwitched, setIsSwitched] = useState(theme.value);
  //const [themes, setThemes] = useState(theme);

  //   useEffect(() => {
  //     if (theme.mode === "darkMode") {
  //       setIsSwitched(true);
  //     }
  //   });

  const toggleTheme = () => {
    console.log(theme);

    //const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme((newTheme) => (newTheme === lightTheme ? darkTheme : lightTheme));
    //await AsyncStorage.setItem("theme", newTheme);

    //setIsSwitched(!isSwitched);
  };

  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const logOut = () => {
    navigation.navigate("Login");
  };

  const clearData = () => {
    Alert.alert(
      "Clear expenses",
      "Are you sure you want to clear your expenses?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: () => {
            AsyncStorage.removeItem("expenses")
              .then(() => {
                Alert.alert(
                  "Expenses cleared",
                  "restart your app to reflect changes"
                );
                console.log("Expenses data cleared from AsyncStorage");
              })
              .catch((error) => {
                console.error(
                  "Error clearing expenses data from AsyncStorage",
                  error
                );
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete account",
          onPress: () => {
            AsyncStorage.removeItem("expenses").then(() => {
              console.log("expenses cleared");
            });
            AsyncStorage.removeItem("userData")
              .then(() => {
                console.log("User data cleared from AsyncStorage");
                navigation.navigate("Login");
                Alert.alert("Account deleted", "Your account has been deleted");
              })
              .catch((error) => {
                console.error(
                  "Error clearing expenses data from AsyncStorage",
                  error
                );
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles(theme).main}>
      <StatusBar backgroundColor={theme.primary} />
      <Header />
      <View>
        <TouchableOpacity
          style={{
            marginVertical: 16,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.button,
            padding: 8,
            backgroundColor: theme.primary,
          }}
          onPress={logOut}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.textSecondary,
              }}
            >
              Log out
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              marginVertical: 16,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: theme.button,
              padding: 8,
              backgroundColor: theme.primary,
            }}
            onPress={toggleTheme}
          >
            <Text style={{ color: theme.textSecondary }}>
              Toggle Light/Dark Mode
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={deleteAccount}
          style={{
            marginVertical: 16,
            borderWidth: 1,
            borderColor: theme.button,
            borderRadius: 8,
            padding: 8,
            backgroundColor: theme.primary,
          }}
        >
          <Text style={{ color: theme.textSecondary, textAlign: "center" }}>
            Delete Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearData}
          style={{
            marginVertical: 16,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.button,
            padding: 8,
            backgroundColor: theme.primary,
          }}
        >
          <Text
            style={{
              color: theme.textSecondary,
              textAlign: "center",
            }}
          >
            Clear Expenses
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      // paddingVertical: 16,
      // paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      //marginTop: 24,
    },
  });
