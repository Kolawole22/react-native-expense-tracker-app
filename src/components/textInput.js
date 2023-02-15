import { StyleSheet, View, Button, KeyboardAvoidingView } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

export default function EntryForm({
  placeholder,
  secureTextEntry,
  keyboardType,
  onChangeText,
  multiline,
  value,
  label,
  autoCorrect,
  numeric,
  email,
  maxLength,
}) {
  return (
    <KeyboardAvoidingView
      enabled
      style={styles.inputContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //keyboardVerticalOffset={20} // Adjust the offset as needed
      //style={{ marginBottom: 32 }}
    >
      <TextInput
        style={{ marginVertical: 12 }}
        outlineStyle={{ borderRadius: 8 }}
        label={label}
        floating={false}
        mode="outlined"
        placeholder={placeholder}
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numeric={numeric}
        email={email}
        maxLength={maxLength}
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
    //borderWidth: 2,
    //borderColor: "black",
    width: "95%",
    padding: 5,
    borderRadius: 16,
  },
});
