import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function ButtonComponent({ title, onPress }) {
  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginDown: 16,
    backgroundColor: "#37022d",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});
