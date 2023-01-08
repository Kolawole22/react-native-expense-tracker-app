import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

const Item = ({ fruit }) => {
  return (
    <View>
      <Text>{fruit}</Text>
    </View>
  );
};

const renderItem = ({ Item }) => <Item name={Item.fruit} />;

export default function App() {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.text}>sign in to your account</Text>
      </View>
      <View style={styles.user}>
        <TextInput placeholder="Username" style={styles.username} />
        <TextInput placeholder="Password" style={styles.Password} />
        <Button title="Log in" style={styles.login} />
        <View style={styles.signup}>
          <Text style={styles.signup}>Don't have an account sign up</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "lightblue",
    borderColor: "black",
  },
  container: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  text: {
    fontSize: 16,
    flex: 0.5,
    alignItems: "center",
    fontSize: 18,
    color: "white",
  },
  user: {
    marginTop: 200,
    flex: 0.3,
    flexDirection: "column",
    borderwidth: 2,
    marginHorizontal: 64,
  },
  username: {
    borderWidth: 1,
    borderRadius: 32,
    borderColor: "black",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    fontSize: 16,
  },
  Password: {
    borderWidth: 1,
    borderRadius: 32,
    borderColor: "black",
    marginVertical: 8,
    justifyContent: "center",
    padding: 8,
    fontSize: 16,
  },
  log: {
    backgroundColor: "white",
  },
  login: {
    width: "50%",
  },
  signup: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
