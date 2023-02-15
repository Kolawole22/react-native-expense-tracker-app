import { Text, View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../../ThemeContext";

export default function Header(props) {
  const [theme] = useContext(ThemeContext);
  return (
    <View style={styles(theme).headerContainer}>
      <Text style={styles(theme).header}>{props.title}</Text>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      //flex: 20,
      marginVertical: 8,
      paddingVertical: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
