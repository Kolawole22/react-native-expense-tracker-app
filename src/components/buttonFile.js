import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../../ThemeContext";

export default function ButtonComponent({ title, onPress, onBlur, ref }) {
  const [theme] = useContext(ThemeContext);
  return (
    <View>
      <TouchableOpacity style={styles(theme).buttonContainer} onPress={onPress}>
        <Text style={styles(theme).buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    buttonContainer: {
      marginDown: 16,
      backgroundColor: "#1a73e8",
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 8,
    },
    buttonText: {
      color: theme.text,
      fontSize: 24,
    },
  });
