//import SQLite from "react-native-sqlite-storage";
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
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import EntryForm from "../components/textInput.js";
//import * as fs from "expo-file-system";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as SQLite from "expo-sqlite";
import ExpenseContext from "../../ExpenseContext";
import ThemeContext from "../../ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const ExpenseScreen = ({ navigation, props }) => {
  //const db = SQLite.openDatabase("db.db");
  var date = moment();
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState([
    { label: "Food & Dining", value: "Food & Dining" },
    { label: "Shopping", value: "Shopping" },
    { label: "Housing", value: "Housing" },
    { label: "Transportation", value: "Transportation" },
    { label: "Vehicle", value: "Vehicle" },
    { label: "Utilities", value: "Utilities" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "HealthCare", value: "HealthCare" },
    { label: "Travel", value: "Travel" },
    { label: "Clothing", value: "Clothing" },
    { label: "Miscellaneous", value: "Miscellaneous" },
    { label: "Personal Care", value: "Personal Care" },
    { label: "Gifts & Donations", value: "Gifts & Donations" },
    { label: "Education", value: "Education" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState("");
  const [transaction, addTransaction] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [theme] = useContext(ThemeContext);
  //const [forceUpdate, forceUpdateId] = useForceUpdate();
  //const [transactionStored, setTransactionStored] = userData([]);
  //var updatedTransaction;

  function amountInputHandler(enteredText) {
    setAmount(enteredText);
    //console.log(enteredText);
  }

  function categoryInputHandler(enteredText) {
    setCategory(enteredText);
    //console.log(enteredText);
  }

  function descriptionInputHandler(enteredText) {
    setDescription(enteredText);
    //console.log(enteredText);
  }

  const [dummyData, setDummyData] = useState(0);
  const [expenses, setExpenses] = useContext(ExpenseContext);
  const [expense, setExpense] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (dummyData === 0) {
        try {
          const storedExpenses = await AsyncStorage.getItem("expenses");
          if (storedExpenses !== null) {
            const parsedStoredExpenses = JSON.parse(storedExpenses);
            setExpenses(parsedStoredExpenses);
          } else {
            setExpenses([]);
          }
          if (expenses === null) {
            setExpenses([]);
          }
          setDummyData(1);
          // console.log("dummyData:", dummyData);
          // console.log("expenses fetched:", expenses);
          //AsyncStorage.setItem("expenses", JSON.stringify(expenses));
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("expenses", JSON.stringify(expenses));
    //console.log("last item saved");
  }, [expenses]);

  const handleAddExpense = () => {
    if (!amount || amount.trim() === "") {
      Alert.alert("Warning!", "Please enter an amount");
      return;
    }
    if (!value || value.trim() === "") {
      Alert.alert("Warning!", "Please enter a category");
      return;
    } else {
      setExpenses([
        ...expenses,
        {
          Month: date.format("MMMM"),
          ID: Math.random().toString(36).substr(2, 9),
          Day: date.format("dddd"),
          DayNo: new Date().getDate(),
          Year: new Date().getFullYear(),
          //DayOfMonth: date.format(DD),
          Amount: parseInt(amount),
          Category: value,
          Description: description,
        },
      ]);
      //setAmount("");

      //console.log("expenses:", expenses);
      AsyncStorage.setItem("expenses", JSON.stringify(expenses));
      Alert.alert("SUCCESSFUL", "expense added successfully");
      setExpense("data saved");
      //console.log("data saved");
      //setDummyData("data added");
      //setExpense("data saved");
    }
  };

  return (
    <ScrollView style={styles(theme).main}>
      <SafeAreaView>
        <StatusBar backgroundColor={theme.primary} />
        <Header title="New Expense" />
        <View style={styles(theme).logoContainer}>
          <Ionicons name="ios-wallet" size={64} color={theme.button} />
        </View>
        <View style={{ marginTop: 64, marginLeft: 8 }}>
          <EntryForm
            placeholder="Enter Amount"
            onChangeText={amountInputHandler}
            label="Amount"
            keyboardType="numeric"
            numeric={true}
            //value="Amount"
          />
          <View>
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
                style={styles(theme).input}
                placeholder="Category"
                open={open}
                value={value}
                items={category}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setCategory}
                dropDownStyle={{ backgroundColor: "pink" }}
              />
            </View>

            <EntryForm
              //style={styles.input}
              placeholder="Enter Description"
              multiline={true}
              maxLength={30}
              label="Description"
              onChangeText={descriptionInputHandler}
            />
            <ButtonComponent title="Add Expense" onPress={handleAddExpense} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default ExpenseScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      // paddingVertical: 16,
      paddingHorizontal: 16,
      // marginTop: 24,
    },

    image: {
      marginTop: 16,
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    logoContainer: {
      //flex: 0.4,
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
      color: theme.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "black",
      width: "95%",
      padding: 5,
      borderRadius: 8,
      textAlignVertical: "top",
      paddingVertical: 20,
      paddingLeft: 20,
    },
    textContainer: {
      justifyContent: "flex-start",
      marginLeft: 8,
    },
  });
