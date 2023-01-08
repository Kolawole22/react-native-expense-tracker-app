import {
  StyleSheet,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";

export default function EntryForm({
  placeholder,
  secureTextEntry,
  KeyboardType,
  onChangeText,
  multiline,
}) {
  return (
    <KeyboardAvoidingView enabled style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        KeyboardType={KeyboardType}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    //flex: 0.2,
    alignItems: "center",
    marginBottom: 32,
  },
  input: {
    color: "black",
    fontSize: 16,
    borderWidth: 2,
    borderColor: "black",
    width: "95%",
    padding: 5,
    borderRadius: 8,
  },
});
