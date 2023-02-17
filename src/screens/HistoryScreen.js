import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import EntryForm from "../components/textInput.js";
//import ExpenseScreen from "./ExpenseScreen";
//import { GlobalData } from "./ExpenseScreen";
//import { transaction } from "./ExpenseScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as SQLite from "expo-sqlite";
import ExpenseContext from "../../ExpenseContext";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "../../ThemeContext";
import "intl/locale-data/jsonp/en-NG.js";

const HistoryScreen = (props) => {
  //let { data } = props.route.params;
  const [data, setData] = useState([]);
  const [theme] = useContext(ThemeContext);

  const [testData, setTestData] = useState([]);
  const [expenses, setExpenses] = useContext(ExpenseContext);

  const deleteExpense = (itemId) => {
    const newExpenses = expenses.filter((item) => item.ID !== itemId);
    //console.log(newExpenses);

    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            setExpenses(newExpenses);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles(theme).main}>
      <StatusBar backgroundColor={theme.primary} />
      <Header title="Expenses" />
      {expenses !== null ? (
        <FlatList
          //style={{ backgroundColor: theme.background }}
          alwaysBounceVertical={true}
          data={expenses}
          renderItem={(itemData) => {
            return (
              <View style={styles(theme).list}>
                <Text style={styles(theme).listText}>
                  Date: {itemData.item.Day}, {itemData.item.DayNo},{" "}
                  {itemData.item.Month}, {itemData.item.Year}
                </Text>
                <Text style={styles(theme).listText}>
                  Amount:{" "}
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(itemData.item.Amount)}
                </Text>
                <Text style={styles(theme).listText}>
                  Category: {itemData.item.Category}
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <View style={{ flex: 10 }}>
                    <Text style={styles(theme).listText}>
                      Description: {itemData.item.Description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteExpense(itemData.item.ID)}
                    style={{ flex: 1 }}
                  >
                    <Ionicons name="ios-trash" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.ID;
          }}
          alwaysBounceVertical={true}
        />
      ) : (
        <View
          style={{
            marginVertical: -18,
            paddingVertical: 320,
            backgroundColor: theme.background,
            //flex: ,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                //marginTop: 240,
                color: theme.text,
              }}
            >
              No expenses made yet
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default HistoryScreen;

const styles = (theme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      // marginTop: 24,
      paddingHorizontal: 16,
      // paddingVertical: 16,
    },
    list: {
      marginVertical: 8,
      backgroundColor: theme.primary,
      marginHorizontal: 16,
      paddingVertical: 8,
      alignItems: "flex-start",
      //flex: 0.8,
      borderWidth: 2,
      borderColor: theme.tetiary,
      borderRadius: 6,
      //flexDirection: "column",
    },
    listText: {
      color: theme.textSecondary,
      fontSize: 12,
      justifyContent: "center",
      borderRadius: 32,
      marginLeft: 16,
    },
  });
