import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AuthScreen from "./src/screens/AuthScreen";
import BalanceScreen from "./src/screens/BalanceScreen";
import ExpenseScreen from "./src/screens/ExpenseScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./src/navigation/tabNavigation";
import ExpenseContext from "./ExpenseContext";
import UserDataContext from "./userDataContext";
// import {
//   Provider as PaperProvider,
//   //DefaultTheme,
//   DarkTheme,
// } from "react-native-paper";
//import { ThemeProvider } from "./ThemeContext";
import ThemeContext from "./ThemeContext";
//import { ThemeProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./Theme";

const TabScreens = {
  Balance: {
    screen: BalanceScreen,
  },
  Expense: {
    screen: ExpenseScreen,
  },
  History: {
    screen: HistoryScreen,
  },
};

//const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

export default function App(navigation) {
  const [expenses, setExpenses] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const [userData, setUserData] = useState([]);
  const [dummyData, setDummyData] = useState(null);
  // let context_data = {
  //   expenses: expenses,
  // };
  //const [isSwitched, setIsSwitched] = useState(false);

  useEffect(() => {
    async function fetchTheme() {
      if (dummyData === null) {
        try {
          const unParsedThemeFromStorage = await AsyncStorage.getItem("theme");
          const themeFromStorage = JSON.parse(unParsedThemeFromStorage);
          //console.log("rawTheme:", themeFromStorage);
          if (themeFromStorage) {
            setTheme(themeFromStorage);
            //console.log("it is not null");
          }
        } catch (e) {
          console.log(e);
        }
      }
      setDummyData("data loaded");
    }
    fetchTheme();
  }, []);

  //AsyncStorage.getItem(expenses)

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  return (
    <UserDataContext.Provider value={[userData, setUserData]}>
      <ExpenseContext.Provider value={[expenses, setExpenses]}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                //theme={theme}
                //setTheme={setTheme}
                name="Tabs"
                component={Tabs}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </ExpenseContext.Provider>
    </UserDataContext.Provider>
  );
}
