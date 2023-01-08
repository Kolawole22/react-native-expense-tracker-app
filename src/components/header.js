import { Text, View, StyleSheet } from "react-native";
import React from "react";
export default function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.2,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "black",
    fontSize: 16,
  },
});
