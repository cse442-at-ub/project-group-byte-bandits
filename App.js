import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ViewComponent,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./src/screens/Onboarding";
import Chatroom from "./src/screens/Chatroom"
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { UserContext } from "./src/context/UserContext";

// THIS MUST CHANGE TO TYPESCRIPT

const Stack = createNativeStackNavigator();

const ListItem = ({ id, onPress, style }) => (
  <View style={style.item}>
    <Text>{id}</Text>
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Text>Button</Text>
    </TouchableOpacity>
  </View>
);

const sendFriendRequest = async (from_id, to_id) => {
  await fetch("http://127.0.0.1:5000/api/friend-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from_id, to_id }),
  });
  const newFriendRequestRes = await fetch(
    "http://127.0.0.1:5000/api/get-friend-requests"
  );
  const json = await newFriendRequestRes.json();
  return json;
};

const alreadyFriends = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 5,
  },
});

const seeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});

export default function App() {
  const [id, setID] = useState(null);
  const [users, setUsers] = useState([]);
  /*const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/get-friend-requests", { method: "GET" })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setFriendRequest(r);
      });
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/make-user", { method: "POST" })
      .then((r) => r.json())
      .then((u) => {
        setID(u.id);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/get-users", { method: "GET" })
      .then((r) => r.json())
      .then((users) => {
        setUsers(users);
      });
  }, []);*/
  return (
    <UserContext.Provider
      value={{
        id,
        setID,
      }}>
      { <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding"
        component={Onboarding}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Chatroom"
        component={Chatroom}
      />
      </Stack.Navigator>
      </NavigationContainer> }
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const parentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

const friendRequest = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
