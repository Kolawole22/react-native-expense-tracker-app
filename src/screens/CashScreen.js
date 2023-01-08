import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import TextInput from "../components/textInput.js";
//import { icon } from "@rneui/themed";
import { PaymentIcon } from "react-native-payment-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CashScreen = () => {
  const [trasanctionData, setTransactionData] = useState([]);
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    try {
      const stringifiedTransactionDetails = await AsyncStorage.getItem(
        "transactionDetails"
      );

      const stringifiedUserDetails = await AsyncStorage.getItem("userDetails");

      const transactionDetailsData = JSON.parse(stringifiedTransactionDetails);
      const userDetailsData = JSON.parse(stringifiedUserDetails);
      setTransactionData(transactionDetailsData);
      setUserData(userDetailsData);
      console.log(trasanctionData.Month);
      console.log(userData.Age);
    } catch (error) {
      console.log(error);
    }
    console.log(trasanctionData);
    console.log(userData);
  };
  const trans =
    trasanctionData.reduce((total, obj) => obj.Amount + total, 0) -
    userData.AccountBalance;

  const [budgetBalance, setBudgetBalance] = useState(trans);

  const [budgetAmount, setBudgetAmount] = useState("");

  function budgetAmountInputHandler(enteredText) {
    setBudgetAmount(enteredText);
    console.log(enteredText);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.main}>
      <Header title="Wallet" />
      <View style={styles.container}>
        <View style={{ marginVertical: 16 }}>
          <Text style={styles.text}>{userData.Name}</Text>
        </View>
        <View style={{ marginVertical: 16, alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="cash" size={48} color="#d872c4" />
          </View>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.amount}>{budgetBalance}</Text>
          <TextInput
            placeholder="enter amount"
            onChangeText={budgetAmountInputHandler}
          />
          <ButtonComponent
            title="Add to the budget"
            onPress={() => {
              budgetAmount + budgetBalance;
            }}
          />
        </View>
        <View></View>
      </View>
    </View>
  );
};
export default CashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EFDFEC",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  container: {
    marginTop: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 24,
  },
});
