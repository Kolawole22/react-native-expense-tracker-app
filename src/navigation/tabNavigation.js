import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CashScreen from "../screens/CashScreen";
import TransactionScreen from "../screens/TransactionScreen";
import HistoryScreen from "../screens/HistoryScreen";

//const Tab = createBottomTabNavigator();
const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#320a2b",
          tabBarHideOnKeyboard: true,
        },
      }}
    >
      <Tab.Screen
        name="Cash"
        component={CashScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarOptions: {
            activeTintColor: "darkpurple",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? "#d872c4" : "#df9bd2"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
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
                color={tabInfo.focused ? "#d872c4" : "#df9bd2"}
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
                name="calendar-sharp"
                size={24}
                color={tabInfo.focused ? "#d872c4" : "#df9bd2"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
