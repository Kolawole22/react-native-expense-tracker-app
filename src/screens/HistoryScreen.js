import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Header from "../components/header.js";
import ButtonComponent from "../components/buttonFile.js";
import EntryForm from "../components/textInput.js";
import TransactionScreen from "./TransactionScreen";
import { transaction } from "./TransactionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  //let { data } = props.route.params;
  const [data, setData] = useState([]);
  //var dat;
  //const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    console.log("This component has been rendered");
    getData();

    //console.log("data retrieved");
  }, []);

  const getData = async () => {
    try {
      const stringifiedTransactionDetails = await AsyncStorage.getItem(
        "transactionDetails"
      );
      //const empty = [];
      // const savedData = (await AsyncStorage.getItem("historyData")) || "[]";
      // //console.log(stringifiedTransactionDetails);
      const dat = JSON.parse(stringifiedTransactionDetails);
      // const hist = JSON.parse(savedData);
      // //setData(dat);
      // //console.log(dat);
      // //setData([]);
      setData(dat);
      console.log(data);

      //AsyncStorage.setItem("historyData", JSON.stringify(data));
      //const dataToUpdate = await AsyncStorage.getItem("historyData");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.main}>
      <Header />
      <FlatList
        alwaysBounceVertical={true}
        data={data}
        renderItem={(itemData) => {
          return (
            <View style={styles.list}>
              <Text style={styles.listText}>
                Date: {itemData.item.Day}, {itemData.item.DayNo},{" "}
                {itemData.item.Month}
              </Text>
              <Text style={styles.listText}>
                Amount: {itemData.item.Amount}
              </Text>
              <Text style={styles.listText}>
                Category: {itemData.item.Category}
              </Text>
              <Text style={styles.listText}>
                Description: {itemData.item.Description}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={true}
      />
    </View>
  );
};
export default HistoryScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EFDFEC",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  list: {
    marginVertical: 8,
    backgroundColor: "#EFBCED",
    marginHorizontal: 8,
    paddingVertical: 8,
    alignItems: "flex-start",
    flex: 0.8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    //flexDirection: "column",
  },
  listText: {
    color: "black",
    fontSize: 12,
    justifyContent: "center",
    borderRadius: 32,
    marginLeft: 16,
  },
});
