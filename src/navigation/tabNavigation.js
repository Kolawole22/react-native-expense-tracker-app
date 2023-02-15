import React, { useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BalanceScreen from "../screens/BalanceScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import HistoryScreen from "../screens/HistoryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ThemeContext from "../../ThemeContext";

//const Tab = createBottomTabNavigator();
const Tabs = (props) => {
  const [theme] = useContext(ThemeContext);
  //console.log(theme);
  const col = theme.secondary;
  const tabBackground = theme.primary;
  const tabIcon = theme.tab;
  const tabIconFocused = theme.tabFocused;
  //console.log("col:", col);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: tabBackground,
          tabBarHideOnKeyboard: true,
          backBehavior: "firstRoute",
        },
      }}
    >
      <Tab.Screen
        name="Expense"
        component={ExpenseScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Add Expense",
          tabBarOptions: {
            activeTintColor: "darkpurple",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="pricetag"
                size={24}
                color={tabInfo.focused ? tabIconFocused : tabIcon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Balance"
        component={BalanceScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Balance",
          tabBarOptions: {
            activeTintColor: "darkpurple",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-card"
                size={24}
                color={tabInfo.focused ? tabIconFocused : tabIcon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "History",
          tabBarOptions: {
            activeTintColor: "darkpurple",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-list"
                size={24}
                color={tabInfo.focused ? tabIconFocused : tabIcon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarOptions: {
            activeTintColor: "darkpurple",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-cog"
                size={24}
                color={tabInfo.focused ? tabIconFocused : tabIcon}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
