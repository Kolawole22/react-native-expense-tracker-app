import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import TextInput from "../components/textInput.js";
//import { icon } from "@rneui/themed";
//import { PaymentIcon } from "react-native-payment-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseContext from "../../ExpenseContext";
import ThemeContext from "../../ThemeContext";
import UserDataContext from "../../userDataContext";
import "intl";
import "intl/locale-data/jsonp/en-US.js";
import "intl/locale-data/jsonp/en-NG.js";

const BalanceScreen = ({ props }) => {
  const [transactionData, setTransactionData] = useState([]);
  // [userData, setUserData] = useState([]);
  const [expenses] = useContext(ExpenseContext);
  const [budgetBalance, setBudgetBalance] = useState(null);
  //const [budgetSpent, setBudgetSpent] = useState(null);
  const [budgetDisplay, setBudgetDisplay] = useState(null);
  const [amountSpent, setAmountSpent] = useState(null);
  const [theme] = useContext(ThemeContext);
  const [userData] = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);
  // if (expenses !== null) {
  //   const budgetSpent = Number(
  //     expenses.reduce((total, obj) => obj.Amount + total, 0)
  //   );
  // }

  const categorySums = {};

  if (expenses.length > 0) {
  }

  // function budgetAmountInputHandler(enteredText) {
  //   setBudgetAmount(enteredText);
  //   console.log(enteredText);
  // }

  if (expenses.length <= 0) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style={styles.statusBar} />
        <View style={styles(theme).main}>
          <Header title="Wallet" style={styles(theme).text} />
          <View style={styles(theme).container}>
            <View style={{ alignItems: "center" }}>
              <Ionicons name="ios-wallet" size={100} color={theme.button} />
            </View>
            <View
              style={{
                marginVertical: 16,
                borderRadius: 12,
                backgroundColor: theme.tab,
                width: "70%",
                paddingHorizontal: 8,
                paddingVertical: 16,
                alignItems: "center",
              }}
            >
              <Text style={styles(theme).text}>{userData.Name}</Text>
            </View>
            <View
              style={{
                marginVertical: 16,
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: theme.tab,
                width: "70%",
                paddingHorizontal: 8,
                paddingVertical: 6,
              }}
            >
              <Text style={styles(theme).text}>Balance</Text>
              <Text style={styles(theme).amount}>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  currencyDisplay: "symbol",
                }).format(userData.AccountBalance)}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.tab,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 6,
              }}
            >
              <Text style={styles(theme).text}>Total Amount Spent</Text>
              <Text style={styles(theme).amount}>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  currencyDisplay: "symbol",
                }).format(Number(0))}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    for (const obj of expenses) {
      const category = obj.Category;
      const amount = obj.Amount;

      if (categorySums[category]) {
        categorySums[category] += amount;
      } else {
        categorySums[category] = amount;
      }
    }
    const highestCategory = Object.keys(categorySums).reduce((a, b) =>
      categorySums[a] > categorySums[b] ? a : b
    );
    const highestAmount = categorySums[highestCategory];

    return (
      <SafeAreaView style={styles(theme).main}>
        <StatusBar backgroundColor={theme.primary} />
        <Header title="Wallet" style={styles(theme).text} />
        <View style={styles(theme).container}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="ios-wallet" size={100} color={theme.button} />
          </View>
          <View
            style={{
              marginVertical: 16,
              borderRadius: 12,
              backgroundColor: theme.tab,
              width: "70%",
              paddingHorizontal: 8,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text style={styles(theme).text}>{userData.Name}</Text>
          </View>
          <View
            style={{
              marginVertical: 16,
              alignItems: "center",
              borderRadius: 12,
              backgroundColor: theme.tab,
              width: "70%",
              paddingHorizontal: 8,
              paddingVertical: 6,
            }}
          >
            <Text style={styles(theme).text}>Balance</Text>
            <Text style={styles(theme).amount}>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "symbol",
              }).format(
                userData.AccountBalance -
                  Number(expenses.reduce((total, obj) => obj.Amount + total, 0))
              )}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.tab,
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 6,
            }}
          >
            <Text style={styles(theme).text}>Total Amount Spent</Text>
            <Text style={styles(theme).amount}>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "symbol",
              }).format(
                Number(expenses.reduce((total, obj) => obj.Amount + total, 0))
              )}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.tab,
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 6,
              marginVertical: 8,
            }}
          >
            <Text style={styles(theme).text}>You have spent </Text>
            <Text style={styles(theme).amount}>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "symbol",
              }).format(Number(highestAmount))}
            </Text>
            <Text style={styles(theme).text}>on {highestCategory}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
export default BalanceScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      // paddingVertical: 8,
      paddingHorizontal: 8,
      //marginTop: 24,
    },

    container: {
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
    },
    amount: {
      fontSize: 24,
      color: theme.text,
    },
  });
