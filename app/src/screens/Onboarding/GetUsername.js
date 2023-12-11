import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { create_username } from "../../bubble_api/bubble_api";
import theme from "../../components/theme";

export const GetUsername = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userID = useSelector((state) => state.user.userID);
  const scheme = useColorScheme();
  const colors = theme(scheme);

  async function CreateUsername() {
    const data = await create_username(username);
    setErrorMessage(data);
    console.log(data);
    if (data == "") {
      navigation.navigate("HomePage");
    }
  }

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: colors.widget }]}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.welcomeText,{color: colors.text}]}>Hello!</Text>
        <Text style={[styles.subWelcomeText,{color: colors.subText}]}>
          Welcome to <Text style={{ color: colors.text }}>Bubble</Text> 👋
        </Text>
      </View>

      <View style={styles.centerContent}>
        <View style={[styles.profileCircle,{borderColor: colors.homeBackground}]}>
        <TouchableOpacity style={[styles.cameraCircle, { backgroundColor: colors.homeBackground, borderColor: colors.homeBackground} ]}>
    <Entypo name="plus" size={20} color="white" />
  </TouchableOpacity>
          </View>

        <View style={styles.leftContent}>
          <Text style={styles.enterUsername}>
            <Text style={{ color: colors.subText }}>Enter a username</Text>
          </Text>
          <Text style={styles.description}>
            Others will be able to search you up with this username
          </Text>
        </View>

        <TextInput
          onChangeText={(text) => setUsername(text)}
          style={styles.inputField}
          value={username}
          placeholder="Enter a username"
          placeholderTextColor="gray"
        />

        <View style={styles.errorMessage}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>

        <TouchableOpacity 
    style={[
        styles.createAccountButton,
        {backgroundColor: scheme === 'dark' ? colors.background : colors.buttonBackground}
    ]}
>
            <Text
            onPress={() => CreateUsername()}
            style={[styles.createAccountText,{color: "white"}]}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorMessageText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "red",
  },
  errorMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  welcomeContainer: {
    alignItems: "flex-start",
    margin: 20,
    marginTop: "20%",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subWelcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  centerContent: {
    alignItems: "center",
  },
  profileCircle: {
    borderWidth: 5,
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 20,
  },
  addIcon: {
    fontSize: 32,
    color: "white",
    bottom: 5,
  },
  leftContent: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 10,
  },
  enterUsername: {
    color: "white",
    fontSize: 26,
  },
  description: {
    color: "#939BA7",
    fontSize: 14,
  },
  inputField: {
    width: "80%",
    borderRadius: 20,
    borderColor: "#939BA7",
    borderWidth: 1,
    color: "white",
    paddingLeft: 15,
    marginTop: 40,
    padding: 20,
  },
  createAccountButton: {
    width: "40%",
    borderRadius: 20,
    padding: 15,
    marginTop: 60,
    alignItems: "center",
  },
  createAccountText: {
    fontWeight: "bold",
  },
  cameraCircle: {
    position: 'absolute',
    right: 0, 
    bottom: '5%',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, 
    zIndex: 2,
  },
});

export default GetUsername;
