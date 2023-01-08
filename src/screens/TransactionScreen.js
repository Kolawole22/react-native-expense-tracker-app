import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import EntryForm from "../components/textInput.js";
import * as fs from "expo-file-system";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLite } from "expo-sqlite";

const TransactionScreen = ({ navigation }) => {
  var date = moment();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState([
    { label: "Food & Drinks", value: "Food & Drinks" },
    { label: "Shopping", value: "Shopping" },
    { label: "Housing", value: "Housing" },
    { label: "Transportation", value: "Transportation" },
    { label: "Vehicle", value: "Vehicle" },
    { label: "Life & Entertainment", value: "Life & Entertainment" },
    { label: "Communication, PC", value: "Communication, PC" },
    { label: "Financial expenses", value: "Financial expenses" },
    { label: "Investments", value: "Investments" },
    { label: "Clothes", value: "Clothes" },
    { label: "General", value: "General" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState("");
  const [transaction, addTransaction] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  //const [transactionStored, setTransactionStored] = userData([]);
  //var updatedTransaction;

  function amountInputHandler(enteredText) {
    setAmount(enteredText);
    console.log(enteredText);
  }

  function categoryInputHandler(enteredText) {
    setCategory(enteredText);
    console.log(enteredText);
  }

  function descriptionInputHandler(enteredText) {
    setDescription(enteredText);
    console.log(enteredText);
  }

  //useEffect(() => {

  //}, [transaction]);

  //useEffect(() => {
  //try {
  //  var transactionDetails = JSON.stringify(transaction);
  //  console.log(transactionDetails);
  //  AsyncStorage.setItem("transactionDetails", transactionDetails);
  //  console.log(transactionDetails);
  //  Alert.alert("Added successfully");
  //} catch (error) {
  //  console.log(error);
  //}
  //}, []);

  const Transaction = () => {
    addTransaction((currentTransaction) => [
      ...currentTransaction,
      {
        Month: date.format("MMMM"),
        key: Math.floor(Math.random() * 10000).toString(),
        Day: date.format("dddd"),
        DayNo: new Date().getDate(),
        //DayOfMonth: date.format(DD),
        Amount: parseInt(amount),
        Category: value,
        Description: description,
      },
    ]);

    console.log(amount);
    console.log(date.format("MMMM"));
    console.log(description);
    //console.log(transaction);
    console.log(value);
    //AsyncStorage.setItem("transactionDetails", JSON.stringify(transaction));
  };

  const createDatabase = async () => {
    addTransaction((currentTransaction) => [
      ...currentTransaction,
      {
        Month: date.format("MMMM"),
        key: Math.floor(Math.random() * 10000).toString(),
        Day: date.format("dddd"),
        DayNo: new Date().getDate(),
        //DayOfMonth: date.format(DD),
        Amount: parseInt(amount),
        Category: value,
        Description: description,
      },
    ]);

    try {
      const db = SQLite.openDatabase("mydatabase.db");
      const results = await db.executeSql(
        "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, category text, description TEXT, month TEXT, day TEXT, day_of_month INTEGER, key INTEGER, date DATETIME DEFAULT CURRENT_TIMESTAMP)"
      );
      console.log("Results:", results);

      const insertResults = await db.executeSql(
        "INSERT INTO expenses(amount, category, description, month, day, day_of_month, date) VALUES (?, ?)",
        [
          transaction.Month,
          transaction.Category,
          transaction.Description,
          transaction.Month,
          transaction.Day,
          transaction.DayNo,
          transaction.KEY,
        ]
      );
      console.log("insertResults:", insertResults);
      const selectResults = await db.executeSql("SELECT * FROM expenses");
      console.log("selectResults:", selectResults);
      db.close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.main}>
      <Header title="New Transaction" />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("./images/transaction.png")}
        />
      </View>
      <View>
        <View style={{ marginTop: 64, marginLeft: 8 }}>
          <Text>Amount</Text>
        </View>
        <EntryForm
          placeholder="Enter Amount"
          onChangeText={amountInputHandler}
        />
        <View>
          <Text style={{ marginLeft: 8 }}>Category</Text>
          <View
            style={{
              alignItems: "center",
              marginBottom: 32,
              justifyContent: "center",
              marginLeft: 8,
              marginRight: -6,
              paddingVertical: 4,
            }}
          >
            <DropDownPicker
              style={styles.input}
              open={open}
              value={value}
              items={category}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setCategory}
              dropDownStyle={{ backgroundColor: "pink" }}
            />
          </View>
          <Text style={{ marginLeft: 8 }}>Description</Text>
          <KeyboardAvoidingView
            enabled
            style={{ marginBottom: 32, alignItems: "center" }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter Description"
              multiline={true}
              maxLength={150}
              onChangeText={descriptionInputHandler}
            />
          </KeyboardAvoidingView>
          <ButtonComponent title="Add Expense" onPress={createDatabase} />
        </View>
      </View>
    </View>
  );
};
export default TransactionScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EFDFEC",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  image: {
    marginTop: 16,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 0.4,
    marginTop: 8,
    alignItems: "center",
  },
  inputContainer: {
    //flex: 0.2,
    alignItems: "center",
    marginBottom: 32,
    justifyContent: "center",
  },
  input: {
    color: "black",
    fontSize: 16,
    borderWidth: 2,
    borderColor: "black",
    width: "95%",
    padding: 5,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  textContainer: {
    justifyContent: "flex-start",
    marginLeft: 8,
  },
});
